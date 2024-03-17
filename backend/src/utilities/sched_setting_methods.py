import json
from pathlib import Path
#Pathlib mahdollistaa suhteellisen tiedostopolun käyttämisen tiedostoja avatessa


def load_settings():
    try:
        path = Path(__file__).parent / '../sched_settings/custom.json'
        with path.open(encoding='utf-8') as setting_file:
            settings = json.load(setting_file)
    except FileNotFoundError:
        path = Path(__file__).parent / '../sched_settings/default.json'
        with path.open(encoding='utf-8') as setting_file:
            settings = json.load(setting_file)
    return settings

def save_settings(data):
    settings_data = {
        'days': data['days'],
        'hour': data['hour'],
        'enabled': data['enabled'],
        'deltas': data['deltas']
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

    return settings
