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
        with open('src/sched_settings/custom.json', encoding='utf-8') as setting_file:
            settings = json.load(setting_file)
    except FileNotFoundError:
        with open('src/sched_settings/default.json', encoding='utf-8') as setting_file:
            settings = json.load(setting_file)
    return settings

def save_settings(data):
    days = ','.join(map(lambda day: str(day), data[0]))# pylint: disable=undefined-variable, unnecessary-lambda
    hour = data[1]['value']
    enabled = data[2]
    deltas = data[3]['value']

    data = {'days': days , 'hour': hour, 'enabled': enabled, 'deltas': deltas}
    data = validate_settings(data)

    with open('src/sched_settings/custom.json', 'w', encoding='utf-8') as setting_file:
        json.dump(data, setting_file)

    return True


def get_readable_settings():
    settings = load_settings()
    reminder_days = []
    if settings['days']:
        reminder_days = [int(i) for i in settings['days'].split(',')]

    readable_settings = {
        'enabled': settings['enabled'],
        'hour': settings['hour'],
        'days': reminder_days,
        'deltas': settings['deltas']
    }
    return readable_settings

def validate_settings(settings):
    if settings['enabled']:
        if not settings['days']:
            raise ValueError('Valitse ainakin yksi päivä')
        try:
            if not 0 <= int(settings['hour']) <= 23:
                raise ValueError('Virheellinen kellonaika')
        except Exception as exc:
            raise ValueError('Virheellinen kellonaika') from exc
    try:
        deltas = sorted([int(i) for i in settings['deltas'].split()], reverse=True)
        settings['deltas'] = deltas
    except Exception as exc:
        raise ValueError('Virheellinen lista lähetyspäivistä') from exc

    return settings
