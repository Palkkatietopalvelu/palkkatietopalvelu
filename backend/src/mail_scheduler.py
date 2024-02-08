from apscheduler.schedulers.background import BackgroundScheduler

def reminder():
    """ Function for test purposes. """
    print("Scheduler is alive!")

def start_scheduler():
    sched = BackgroundScheduler(daemon=True)
    sched.add_job(reminder,'interval', minutes=0.1)
    sched.start()
