import json
weekdays = [
    'ma',
    'ti',
    'ke',
    'to',
    'pe',
    'la',
    'su'
]

def load_settings():
    try:
        with open('src/sched_settings/custom.json') as setting_file:
            settings = json.load(setting_file)
    except FileNotFoundError:
        with open('src/sched_settings/default.json') as setting_file:
            settings = json.load(setting_file)
    return settings

def save_settings(data):
    old_settings = load_settings()
    days = ','.join(map(lambda day: str(day), data[0]))
    hour = data[1]['value']
    print(hour)
    enabled = not (len(days) == 0 and hour == '')
    if days == '':
        days = old_settings['days']
    if hour == '':
        hour = old_settings['hour']
    data = {'days': days , 'hour': hour, 'enabled': enabled}
    with open('src/sched_settings/custom.json', 'w') as setting_file:
        json.dump(data, setting_file)
    

def get_readable_settings():
    settings = load_settings()
    reminder_days = []
    day_indices = settings['days'].split(',')
    for i in day_indices:
        reminder_days.append(weekdays[int(i)])

    readable_settings = {
        'enabled': settings['enabled'],
        'hour': settings['hour'],
        'days': reminder_days
    }
    return readable_settings