*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser

*** Test Cases ***
Go To Home Page
    Initialize Database
    Go To Home Page
    Home Page Should Be Open

Login With Correct Admin Credentials
    Create User And Go To Login Page
    Set Username  masa@mail.com
    Set Password  masa123
    Submit Credentials
    Login Should Succeed
    Log Out

Login Should Fail With Incorrect Username
    Go To Login Page
    Set Username  pekka@mail.com
    Set Password  masa123
    Submit Credentials
    Login Should Fail

Login Should Fail With Incorrect Password
    Go To Login Page
    Set Username  masa@mail.com
    Set Password  wrong
    Submit Credentials
    Login Should Fail

Logout Should Succeed After Login
    Go To Login Page
    Set Username  masa@mail.com
    Set Password  masa123
    Submit Credentials
    Login Should Succeed
    Log Out
    Logout Should Succeed


*** Keywords ***
Create User And Go To Login Page
    Create New User   masa@mail.com   masa123   1
    Go To Login Page

Login Should Succeed
    Logged In Page Should Be Open

Login Should Fail
    Wait For  Väärä käyttäjätunnus tai salasana

Logout Should Succeed
    Page Should Contain  KIRJAUDU

Register User
    Click Button  Luo käyttäjä

Submit Credentials
    Click Button  Kirjaudu

Log Out
    Click Link  KIRJAUDU ULOS

Set Username
    [Arguments]  ${username}
    Input Text  username  ${username}

Set Password
    [Arguments]  ${password}
    Input Password  password  ${password}
