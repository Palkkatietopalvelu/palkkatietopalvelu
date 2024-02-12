from apscheduler.schedulers.background import BackgroundScheduler
from utilities import client_methods

def reminder():
    """ Function for test purposes. """
    print("Scheduler is alive!")

def start_scheduler():
    sched = BackgroundScheduler(daemon=True)
    sched.add_job(reminder,'interval', minutes=0.1)
    sched.start()
