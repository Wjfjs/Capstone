import schedule

def show():
    print("sex")

schedule.every(1).seconds.do(show)

while True:
    schedule.run_pending()