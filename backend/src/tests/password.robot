*** Settings ***
Resource  resource.robot
Library  ../AppLibrary.py
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser

*** Test Cases ***
Login And Logout Succeeds
    Initialize Database
    Go To Register Page
    Create User  pekka  pekka123
    Login With Credentials  pekka  pekka123
    Logged In Page Should Be Open
    Logout

Change Password Fails With Differing New Passwords
    Login With Credentials  pekka  pekka123
    Logged In Page Should Be Open
    Go To My Page And Open Change Password Form
    Set Old Password  pekka123
    Set New Password  new123
    Set New Password Again  notSame123
    Change Password
    Page Should Contain  Salasanat eivät täsmää

Change Password Fails With Invalid Current Password
    Set Old Password  notMyPassword
    Set New Password  new123
    Set New Password Again  new123
    Change Password
    Page Should Contain  Väärä nykyinen salasana

Change Password Fails With Too Short New Password
    Set Old Password  pekka123
    Set New Password  no
    Set New Password Again  no
    Change Password
    Page Should Contain  Salasanan täytyy olla ainakin 3 merkkiä pitkiä

Change Password Fails With Too Long New Password
    Set Old Password  pekka123
    Set New Password  waytoolongpassword
    Set New Password Again  waytoolongpassword
    Change Password
    Page Should Contain  Salasanan ei saa olla yli 15 merkkiä pitkä

Change Password Succeeds With Valid Info
    Set Old Password  pekka123
    Set New Password  new123
    Set New Password Again  new123
    Change Password
    Page Should Contain  Salasana vaihdettu onnistuneesti
    Logout

Login With Old Password Fails
    Login With Credentials  pekka  pekka123
    Page Should Contain  Väärä käyttäjätunnus tai salasana

Login With New Password Succeeds
    Login With Credentials  pekka  new123
    Logged In Page Should Be Open


*** Keywords ***
Go To My Page And Open Change Password Form
    Click Link  omat sivut
    Page Should Contain  Käyttäjätilin asetukset
    Click Button  Vaihda salasana

Change Password
    Click Button  vaihda
  
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

Logout
    Click Link  kirjaudu ulos
    Page Should Contain  kirjaudu sisään

Create User
    [Arguments]  ${username}  ${password}
    Set Username  ${username}
    Set Password  ${password}
    Click Button  create