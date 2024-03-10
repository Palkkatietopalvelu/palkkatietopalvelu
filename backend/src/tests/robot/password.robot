*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser

*** Test Cases ***
Create User With Initial Password Succeeds
    Initialize Database
    Go To Register Page
    Create User  pekka@mail.com  pekka123
    Login With Credentials  pekka@mail.com  pekka123
    Logged In Page Should Be Open
    Logout

Change Password Fails With Differing New Passwords
    Login With Credentials  pekka@mail.com  pekka123
    Logged In Page Should Be Open
    Go To My Page And Open Change Password Form
    Set Old Password  pekka123
    Set New Password  new123
    Set New Password Again  notSame123
    Change Password
    Wait For  Salasanat eivät täsmää

Change Password Fails With Invalid Current Password
    Set Old Password  notMyPassword
    Set New Password  new123
    Set New Password Again  new123
    Change Password
    Wait For  Väärä nykyinen salasana

Change Password Fails With Too Short New Password
    Set Old Password  pekka123
    Set New Password  no
    Set New Password Again  no
    Change Password
    Wait For  Salasanan täytyy olla ainakin 3 merkkiä pitkä

Change Password Fails With Too Long New Password
    Set Old Password  pekka123
    Set New Password  waytoolongpassword
    Set New Password Again  waytoolongpassword
    Change Password
    Wait For  Salasana ei saa olla yli 15 merkkiä pitkä

Change Password Succeeds With Valid Info
    Set Old Password  pekka123
    Set New Password  new123
    Set New Password Again  new123
    Change Password
    Wait Until Page Contains  Salasana vaihdettu onnistuneesti  timeout=15s
    Log Out

Login With Old Password Fails
    Login With Credentials  pekka@mail.com  pekka123
    Wait For  Väärä käyttäjätunnus tai salasana

Login With New Password Succeeds
    Login With Credentials  pekka@mail.com  new123
    Logged In Page Should Be Open


*** Keywords ***
Go To My Page And Open Change Password Form
    Click Link  OMAT SIVUT
    Wait For  Käyttäjätilin asetukset
    Click Button  Vaihda salasana

Change Password
    Click Button  change-password
  
Set Username
    [Arguments]  ${username}
    Input Text  username  ${username}

Set Password
    [Arguments]  ${password}
    Input Password  password  ${password}

Set Old Password
    [Arguments]  ${password}
    Input Password  oldPassword  ${password}

Set New Password
    [Arguments]  ${password}
    Input Password  newPassword  ${password}

Set New Password Again
    [Arguments]  ${password}
    Input Password  confirmPassword  ${password}

Login With Credentials
    [Arguments]  ${username}  ${password}
    Go To Login Page
    Set Username  ${username}
    Set Password  ${password}
    Click Button  login

Create User
    [Arguments]  ${username}  ${password}
    Set Username  ${username}
    Set Password  ${password}
    Click Button  create
