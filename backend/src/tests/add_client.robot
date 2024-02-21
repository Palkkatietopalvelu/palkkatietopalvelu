*** Settings ***
Resource  resource.robot
Library  ../AppLibrary.py
Suite Setup  Setup With Existing User
Suite Teardown  Close Browser

*** Test Cases ***
Add Client Succeeds With Correct Credentials
    Home Page Should Be Open
    Click Link  lisää asiakas
    Add New Client  testi oy  testi@email.com  +358 123456789  1234567-8  2025/02/12, 2024/12/04, 2024/05/07  kk
    Click Button  Lisää
    Sleep  5s
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
Add New Client
    [Arguments]  ${company}  ${email}  ${phonenumber}  ${bicode}  ${deadline}  ${payperiod}
    Input Text  company  ${company}
    Input Text  email  ${email}
    Input Text  phonenumber  ${phonenumber}
    Input Text  bicode  ${bicode}
    Clear Element Text  deadlines
    Input Text  deadlines  ${deadline}
    Click Element  id=email
    Input Text  payperiod  ${payperiod}
