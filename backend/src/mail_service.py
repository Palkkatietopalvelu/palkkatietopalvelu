def sendmail(mail, msg):
   msg.body = 'Hello, this is flaskmailtest'
   mail.send(msg)
   return "Sent"