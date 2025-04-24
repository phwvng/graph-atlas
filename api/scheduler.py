import sqlite3
from datetime import datetime

class JobScheduler:
    def __init__(self):
        self.jobs = []
        self.max_workers = 4  # Change this based on your system's capabilities
        self.running_jobs = 0

    def schedule(self, job):
        if self.running_jobs < self.max_workers:
            self.jobs.append(job)
            print(f"Job {job.name} added to the scheduler.")
            self.run_jobs()
        else:
            print(f"Cannot add job {job.name}. Maximum worker limit reached.")

    def run_jobs(self):
        while self.jobs:
            job = self.jobs.pop(0)
            job.run()
            self.running_jobs -= 1
            print(f"Job {job.name} executed.")
        else:
            print("No jobs in the scheduler.")

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
        self.total_steps = 0
        self.current_step = 0

    def run(self):
        self.start_time = datetime.now()
        self.status = "running"
        self.update_progress(0, 100)  # Initial progress percentage (customize as needed)
        self.function(*self.args, **self.kwargs)
        self.end_time = datetime.now()
        self.status = "completed"
        self.update_progress(100, 100)

    def update_progress(self, current_step, total_steps):
        self.current_step = current_step
        self.total_steps = total_steps
        self.progress = (self.current_step / self.total_steps) * 100
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
