*** Settings ***
Resource  resource.robot
Library  ../AppLibrary.py
Suite Setup  Open And Configure Browser
Suite Teardown  Close Browser

*** Test Cases ***
Login Succeeds
    Initialize Database
    Create User And Login
    Page Should Contain  kirjautunut sisään

Add Client Succeeds With Correct Credentials
    Page Should Contain  kirjautunut sisään
    Click Link  lisää asiakas
    Add New Client  testi oy  testi@email.com  +358 123456789  1234567-8  2024-11-20  kk
    Click Button  lisää
    Page Should Contain  Asiakas lisätty onnistuneesti

Add Client Fails With Wrong Email Format
    Page Should Contain  kirjautunut sisään
    Click Link  lisää asiakas
    Add New Client  test oy  wrongemail  +358 123456789  1234567-8  2024-12-12  kk
    Click Button  lisää
    Page Should Contain  Sähköposti ei ole oikeassa muodossa

Add Client Fails With Wrong Phonenumber Format
    Page Should Contain  kirjautunut sisään
    Click Link  lisää asiakas
    Add New Client  test oy  test@email.com  123 123456789  1234567-8  2024-12-12  kk
    Click Button  lisää
    Page Should Contain  Puhelinnumero ei ole oikeassa muodossa

Add Client Fails With Wrong BIcode Format
    Page Should Contain  kirjautunut sisään
    Click Link  lisää asiakas
    Add New Client  test oy  test@email.com  +358 123456789  12345678  2024-12-12  kk
    Click Button  lisää
    Page Should Contain  Y-tunnus ei ole oikeassa muodossa

Add Client Fails With Wrong Deadline Format
    Page Should Contain  kirjautunut sisään
    Click Link  lisää asiakas
    Add New Client  test oy  test@email.com  +358 123456789  1234567-8  12/12/2024  kk
    Click Button  lisää
    Page Should Contain  Eräpäivä ei ole oikeassa muodossa

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

Set Username
    [Arguments]  ${username}
    Input Text  username  ${username}

Set Password
    [Arguments]  ${password}
    Input Password  password  ${password}

Add New Client
    [Arguments]  ${company}  ${email}  ${phonenumber}  ${bicode}  ${deadline}  ${payperiod}
    Input Text  company  ${company}
    Input Text  email  ${email}
    Input Text  phonenumber  ${phonenumber}
    Input Text  bicode  ${bicode}
    Input Text  deadline  ${deadline}
    Input Text  payperiod  ${payperiod}
