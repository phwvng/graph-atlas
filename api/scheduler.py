# scheduler.py

import sqlite3
from datetime import datetime
import threading

class JobScheduler:
    def __init__(self):
        self.jobs = []
        self.max_workers = 4  # Change based on system capabilities
        self.running_jobs = 0
        self.lock = threading.Lock()

    def schedule(self, job):
        with self.lock:
            if self.running_jobs < self.max_workers:
                self.jobs.append(job)
                print(f"Scheduling job {job.name}...")
                self.run_jobs()
            else:
                print(f"Cannot schedule job {job.name}. Max worker limit reached.")

    def run_jobs(self):
        while self.jobs and self.running_jobs < self.max_workers:
            job = self.jobs.pop(0)
            threading.Thread(target=self.run_job, args=(job,)).start()
            self.running_jobs += 1

    def run_job(self, job):
        try:
            job.run()
        except Exception as e:
            print(f"Error running job {job.name}: {e}")
        finally:
            with self.lock:
                self.running_jobs -= 1
                self.run_jobs()  # Try to start next job if available

class Job:
    def __init__(self, graph_id, name, function, *args, **kwargs):
        self.graph_id = graph_id
        self.name = name
        self.function = function
        self.args = args
        self.kwargs = kwargs
        self.status = "pending"
        self.start_time = None
        self.end_time = None
        self.progress = 0
        self.total_steps = 100
        self.current_step = 0

    def run(self):
        self.start_time = datetime.now()
        self.status = "running"
        self.update_progress(0, 100)
        self.function(*self.args, **self.kwargs)
        self.end_time = datetime.now()
        self.status = "completed"
        self.update_progress(100, 100)

    def update_progress(self, current_step, total_steps):
        self.current_step = current_step
        self.total_steps = total_steps
        if total_steps > 0:
            self.progress = (self.current_step / self.total_steps) * 100
        else:
            self.progress = 0
        self.update_db()

    def update_db(self):
        conn = sqlite3.connect('graphs.db')
        c = conn.cursor()
        c.execute('''
            INSERT OR REPLACE INTO jobs (id, status, start_time, end_time, progress, total_steps, current_step)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (self.graph_id, self.status, self.start_time, self.end_time, self.progress, self.total_steps, self.current_step))
        conn.commit()
        conn.close()

class GraphJob(Job):
    def __init__(self, graph_id, function, *args, **kwargs):
        super().__init__(graph_id, f"GraphJob-{graph_id}", function, *args, **kwargs)

    def run(self):
        super().run()
        print(f"Graph Job {self.graph_id} completed.")
