import json

def load_settings():
    try:
        with open('src/sched_settings/custom.json', encoding='utf-8') as setting_file:
            settings = json.load(setting_file)
    except FileNotFoundError:
        with open('src/sched_settings/default.json', encoding='utf-8') as setting_file:
            settings = json.load(setting_file)
    return settings

def save_settings(data):
    settings_data = {
        'days': data['days'],
        'hour': data['hour'],
        'enabled': data['enabled'],
        'deltas': data['deltas'],
        'email': data['email'],
        'sms': data['sms'],
        'remindertext': data['remindertext']
    }
    validated_data = validate_settings(settings_data)

    with open('src/sched_settings/custom.json', 'w', encoding='utf-8') as setting_file:
        json.dump(validated_data, setting_file, indent=4)

    return True

def get_readable_settings():
    settings = load_settings()
    readable_settings = {
        'days': settings['days'],
        'hour': settings['hour'],
        'enabled': settings['enabled'],
        'deltas': settings['deltas'],
        'email': settings['email'],
        'sms': settings['sms'],
        'remindertext': settings['remindertext']
    }
    return readable_settings

def validate_settings(settings):
    if settings['enabled']:
        if not settings['days']:
            raise ValueError('Valitse ainakin yksi lähetyspäivä')
        try:
            if not 0 <= int(settings['hour']) <= 23:
                raise ValueError('Virheellinen kellonaika')
            days = settings['days'].split(',')
            if not all(day.isdigit() and 0 <= int(day) <= 6 for day in days):
                raise ValueError('Virheellinen päiväarvo')
        except Exception as exc:
            raise ValueError('Virheellinen arvo') from exc
        if not all(isinstance(delta, int) for delta in settings['deltas']):
            raise ValueError('Virheellisiä delta-arvoja')
        if settings['email'] == 'false' and settings['sms'] == 'false':
            raise ValueError('Valitse ainakin yksi lähetystapa')
        if len(settings['remindertext']) < 2:
            raise ValueError('Muistutusviesti puuttuu')

    return settings
