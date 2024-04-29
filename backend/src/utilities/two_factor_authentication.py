import pyotp
import time
import qrcode
from cryptography.fernet import Fernet
import totp_methods

def create_totp_generator(username, secret = pyotp.random_base32()):
    totp = pyotp.TOTP(secret)
    code_uri = totp.provisioning_uri(name=username, issuer_name='Reilu Palkkatietopalvelu')
    qr_code = qrcode.make(code_uri)
    return qr_code.get_image()