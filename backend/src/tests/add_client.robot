*** Settings ***
Resource  resource.robot
Library  ../AppLibrary.py
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser

*** Test Cases ***
Login Succeeds
    Initialize Database
    Create User And Login
    Home Page Should Be Open

Add Client Succeeds With Correct Credentials
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  testi oy  testi@email.com  +358 123456789  1234567-8  2025/02/12, 2024/12/04, 2024/05/07  kk
    Click Button  Lisää
    Page Should Contain  Asiakas lisätty onnistuneesti

Add Client Fails With Wrong Email Format
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  test oy  wrongemail  +358 123456789  1234567-8  2024/12/12  kk
    Click Button  Lisää
    Page Should Contain  Sähköposti ei ole oikeassa muodossa

Add Client Fails With Wrong Phonenumber Format
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  test oy  test@email.com  123 123456789  1234567-8  2024/12/12  kk
    Click Button  Lisää
    Page Should Contain  Puhelinnumero ei ole oikeassa muodossa

Add Client Fails With Wrong BIcode Format
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  test oy  test@email.com  +358 123456789  12345678  2024/12/12  kk
    Click Button  Lisää
    Page Should Contain  Y-tunnus ei ole oikeassa muodossa

*** Keywords ***
Create User And Login
    Go To Register Page
    Set Username  testuser
    Set Password  123
    Register User
    Go To Login Page
    Set Username  testuser
    Set Password  123
    Login
    Logged In Page Should Be Open

Register User
    Click Button  create

Login
    Click Button  login

Logout
    Click Link  kirjaudu ulos

Set Username
    [Arguments]  ${username}
    Input Text  username  ${username}

Set Password
    [Arguments]  ${password}
    Input Password  password  ${password}

Add New Client
    [Arguments]  ${company}  ${email}  ${phonenumber}  ${bicode}  ${deadlines}  ${payperiod}
    Input Text  company  ${company}
    Input Text  email  ${email}
    Input Text  phonenumber  ${phonenumber}
    Input Text  bicode  ${bicode}
    Input Text  deadlines  ${deadlines}
    Input Text  payperiod  ${payperiod}
