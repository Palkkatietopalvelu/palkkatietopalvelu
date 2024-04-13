*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User
Suite Teardown  Close Browser
Test Setup  Initialize Database

*** Test Cases ***
New Account Can Be Created
    Go To My Page and Click Luo uusi tilitoimistokäyttäjä
    Set Username  antti56@mail.com
    Set Password  antti123
    Submit Credentials
    Create Account Should Succeed

Create New Account Fails With One Letter Username
    Go To My Page and Click Luo uusi tilitoimistokäyttäjä
    Set Username  a
    Set Password  pass123
    Submit Credentials
    Create Account Should Fail With Incorrect Username

Create New Account Fails With One Letter Password
    Go To My Page and Click Luo uusi tilitoimistokäyttäjä
    Set Username  bertta@mail.com
    Set Password  p
    Submit Credentials
    Create Account Should Fail With Short Password

Create New Account Fails With One Letter Username And Password
    Go To My Page and Click Luo uusi tilitoimistokäyttäjä
    Set Username  x
    Set Password  y
    Submit Credentials
    Create Account Should Fail With Incorrect Username

Create New Account Fails With Username Too Long
    Go To My Page and Click Luo uusi tilitoimistokäyttäjä
    Set Username  thisusernameisverylong@mail.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    Set Password  pass123
    Submit Credentials
    Create Account Should Fail With Long Username

Create New Account Fails With Password Too Long
    Go To My Page and Click Luo uusi tilitoimistokäyttäjä
    Set Username  cecilia@mail.com
    Set Password  thispasswordisverylong123
    Submit Credentials
    Create Account Should Fail With Long Password


*** Keywords ***
Go To My Page and Click Luo uusi tilitoimistokäyttäjä
    Go To Mypage
    Click Button  Luo uusi tilitoimistokäyttäjä
    Wait For  Sähköposti

Create Account Should Succeed
    Wait Until Page Contains  Käyttäjä luotu onnistuneesti

Create Account Should Fail With Short Password
    Wait Until Page Contains  Salasana täytyy olla ainakin 3 merkkiä pitkä   timeout=5s

Create Account Should Fail With Long Password
    Wait Until Page Contains  Salasana ei saa olla yli 15 merkkiä pitkä   timeout=5s

Create Account Should Fail With Incorrect Username
    Wait Until Page Contains  Sähköposti ei ole oikeassa muodossa   timeout=5s

Create Account Should Fail With Long Username
    Wait Until Page Contains  Sähköposti ei saa olla yli 50 merkkiä pitkä   timeout=5s

Click Create Account Button
    Click Button  luo käyttäjä

Submit Credentials
    Click Button  create
