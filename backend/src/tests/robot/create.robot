*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Initialize Database

*** Test Cases ***
Create Account Page Can Be Opened
    Go To Home Page
    Click Link  REKISTERÖIDY
    Page Should Contain  Luo uusi käyttäjä

New Account Can Be Created
    Go To Register Page
    Set Username  antti56@mail.com
    Set Password  antti123
    Submit Credentials
    Create Account Should Succeed

Create New Account Fails With One Letter Username
    Go To Register Page
    Set Username  a
    Set Password  pass123
    Submit Credentials
    Create Account Should Fail With Incorrect Username

Create New Account Fails With One Letter Password
    Go To Register Page
    Set Username  bertta@mail.com
    Set Password  p
    Submit Credentials
    Create Account Should Fail With Short Password

Create New Account Fails With One Letter Username And Password
    Go To Register Page
    Set Username  x
    Set Password  y
    Submit Credentials
    Create Account Should Fail With Incorrect Username

Create New Account Fails With Username Too Long
    Go To Register Page
    Set Username  thisusernameisverylong@mail.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    Set Password  pass123
    Submit Credentials
    Create Account Should Fail With Long Username

Create New Account Fails With Password Too Long
    Go To Register Page
    Set Username  cecilia@mail.com
    Set Password  thispasswordisverylong123
    Submit Credentials
    Create Account Should Fail With Long Password


*** Keywords ***
Create Account Should Succeed
    Page Should Contain  Käyttäjä luotu onnistuneesti

Create Account Should Fail With Short Password
    Page Should Contain  Salasana täytyy olla ainakin 3 merkkiä pitkä

Create Account Should Fail With Long Password
    Page Should Contain  Salasana ei saa olla yli 15 merkkiä pitkä

Create Account Should Fail With Incorrect Username
    Page Should Contain  Sähköposti ei ole oikeassa muodossa

Create Account Should Fail With Long Username
    Page Should Contain  Sähköposti ei saa olla yli 50 merkkiä pitkä

Click Create Account Button
    Click Button  luo käyttäjä

Set Username
    [Arguments]  ${username}
    Input Text  username  ${username}

Set Password
    [Arguments]  ${password}
    Input Password  password  ${password}

Submit Credentials
    Click Button  create
