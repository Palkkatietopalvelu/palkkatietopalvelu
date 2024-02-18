*** Settings ***
Resource  resource.robot
Library  ../AppLibrary.py
Suite Setup  Setup With Existing User
Suite Teardown  Close Browser

*** Test Cases ***
Add Client Succeeds With Correct Credentials
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  testi oy  testi@email.com  +358 123456789  1234567-8  2024-11-20  kk
    Click Button  lisää
    Page Should Contain  Asiakas lisätty onnistuneesti

Add Client Fails With Wrong Email Format
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  test oy  wrongemail  +358 123456789  1234567-8  2024-12-12  kk
    Click Button  lisää
    Page Should Contain  Sähköposti ei ole oikeassa muodossa

Add Client Fails With Wrong Phonenumber Format
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  test oy  test@email.com  123 123456789  1234567-8  2024-12-12  kk
    Click Button  lisää
    Page Should Contain  Puhelinnumero ei ole oikeassa muodossa

Add Client Fails With Wrong BIcode Format
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  test oy  test@email.com  +358 123456789  12345678  2024-12-12  kk
    Click Button  lisää
    Page Should Contain  Y-tunnus ei ole oikeassa muodossa

Add Client Fails With Wrong Deadline Format
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  test oy  test@email.com  +358 123456789  1234567-8  12/12/2024  kk
    Click Button  lisää
    Page Should Contain  Eräpäivä ei ole oikeassa muodossa

*** Keywords ***
Add New Client
    [Arguments]  ${company}  ${email}  ${phonenumber}  ${bicode}  ${deadline}  ${payperiod}
    Input Text  company  ${company}
    Input Text  email  ${email}
    Input Text  phonenumber  ${phonenumber}
    Input Text  bicode  ${bicode}
    Input Text  deadline  ${deadline}
    Input Text  payperiod  ${payperiod}
