*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
#Test Setup  Create User And Go To Login Page
Test Setup  Open And Configure Browser

*** Test Cases ***
Go To Home Page
    Go To Home Page
    Home Page Should Be Open

Login With Correct Credentials
    Go To Home Page
    # NB! create user: "masa", password: "masa123" in the browser before tests
    Click Link  kirjaudu
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
Login Should Succeed
    Logged In Page Should Be Open

Login Should Fail
    Page Should Contain  Väärä käyttäjätunnus tai salasana

Logout Should Succeed
    Page Should Contain  kirjaudu

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

#Create User And Go To Login Page
#    Create User  masa  masa123
#    Go To Login Page
#    Login Page Should Be Open
