import pyotp
from utilities import totp_methods

def enable_two_factor(user):
    secret = pyotp.random_base32()
    totp_methods.add_totp_secret(secret, user.id)
    return create_totp_generator(user.username, secret)

def create_totp_generator(username, secret = pyotp.random_base32()):
    totp = pyotp.TOTP(secret)
    code_uri = totp.provisioning_uri(name=username, issuer_name='Reilu Palkkatietopalvelu')
    return code_uri

def confirm_two_factor(user_id, code):
    totp = pyotp.TOTP(totp_methods.get_totp_secret(user_id))
    try:
        return totp.verify(code)
    except TypeError:
        return False
