*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Open And Configure Browser
# run initialize_db.py before running robot tests

*** Test Cases ***
Go To Home Page
    Go To Home Page
    Home Page Should Be Open

Login With Correct Credentials
    Create User And Go To Login Page
    Set Username  masa
    Set Password  masa123
    Submit Credentials
    Login Should Succeed
    Close Browser

Login Should Fail With Incorrect Username
    Go To Login Page
    Set Username  pekka
    Set Password  masa123
    Submit Credentials
    Login Should Fail
    Close Browser

Login Should Fail With Incorrect Password
    Go To Login Page
    Set Username  masa
    Set Password  wrong
    Submit Credentials
    Login Should Fail
    Close Browser

Logout Should Succeed After Login
    Go To Login Page
    Set Username  masa
    Set Password  masa123
    Submit Credentials
    Login Should Succeed
    Log Out
    Logout Should Succeed


*** Keywords ***
Create User And Go To Login Page
    Go To Register Page
    Set Username  masa
    Set Password  masa123
    Register User
    Go To Login Page

Login Should Succeed
    Logged In Page Should Be Open

Login Should Fail
    Page Should Contain  Väärä käyttäjätunnus tai salasana

Logout Should Succeed
    Page Should Contain  kirjaudu

Register User
    Click Button  create

Submit Credentials
    Click Button  kirjaudu

Log Out
    Click Link  kirjaudu ulos

Set Username
    [Arguments]  ${username}
    Input Text  username  ${username}

Set Password
    [Arguments]  ${password}
    Input Password  password  ${password}
