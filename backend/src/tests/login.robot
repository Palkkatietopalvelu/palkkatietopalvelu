*** Settings ***
Resource  resource.robot
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser
Test Setup  Create User And Go To Login Page

*** Test Cases ***
Login With Correct Credentials
    Set Username  masa
    Set Password  masa123
    Submit Credentials
    Login Should Succeed

*** Keywords ***
Login Should Succeed
    Main Page Should Be Open

Submit Credentials
    Click Button  Login

Set Username
    [Arguments]  ${username}
    Input Text  username  ${username}

Set Password
    [Arguments]  ${password}
    Input Password  password  ${password}

Create User And Go To Login Page
    Create User  masa  masa123
    Go To Login Page
    Login Page Should Be Open
