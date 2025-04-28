import sqlite3
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor

class JobScheduler:
    def __init__(self, max_workers=4):
        self.jobs = []
        self.max_workers = max_workers
        self.executor = ThreadPoolExecutor(max_workers=max_workers)
        self.running_jobs = 0

    def schedule(self, job):
        print(f"Scheduling job {job.name}...")
        self.jobs.append(job)
        self.run_jobs()

    def run_jobs(self):
        while self.jobs and self.running_jobs < self.max_workers:
            job = self.jobs.pop(0)
            self.running_jobs += 1
            future = self.executor.submit(self._run_job, job)
            future.add_done_callback(lambda f: self._job_done_callback(job))

    def _run_job(self, job):
        try:
            job.run()
        except Exception as e:
            print(f"Error running job {job.name}: {e}")

    def _job_done_callback(self, job):
        self.running_jobs -= 1
        print(f"Job {job.name} completed.")
        self.run_jobs()  # Check if there are more jobs to run

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
        self.update_progress(0, 100)
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
