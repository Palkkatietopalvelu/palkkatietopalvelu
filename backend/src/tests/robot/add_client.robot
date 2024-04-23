*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User
Suite Teardown  Close Browser

*** Test Cases ***
Add Client Succeeds With Correct Credentials
    Go To Home Page
    Home Page Should Be Open
    Click Link  LISÄÄ ASIAKAS
    Add New Client  testi oy  testi@email.com  +358 123456789  1234567-8  2025/02/12, 2024/12/04, 2024/05/07  kk
    Click Button  Lisää
    Wait For  Asiakas lisätty onnistuneesti

Add Client Fails With Wrong Email Format
    Home Page Should Be Open
    Click Link  LISÄÄ ASIAKAS
    Add New Client  test oy  wrongemail  +358 123456789  1234567-8  2024/12/12  kk
    Click Button  Lisää
    Wait For  Sähköposti ei ole oikeassa muodossa

Add Client Fails With Wrong Phonenumber Format
    Go To Home Page
    Home Page Should Be Open
    Click Link  LISÄÄ ASIAKAS
    Add New Client  test oy  test@email.com  123 123456789  1234567-8  2024/12/12  kk
    Click Button  Lisää
    Wait For  Puhelinnumero ei ole oikeassa muodossa

Add Client Fails With Wrong BIcode Format
    Go To Home Page
    Home Page Should Be Open
    Click Link  LISÄÄ ASIAKAS
    Add New Client  test oy  test@email.com  +358 123456789  12345678  2024/12/12  kk
    Click Button  Lisää
    Wait For  Y-tunnus ei ole oikeassa muodossa

All Clients Filter Works In Home Page
    Setup With Two Existing Users And Two Clients
    Log Out
    Login As Admin
    Page Should Contain  testi oy
    Page Should Not Contain  asiakas oy
    Click Link  Omat asiakkaat
    Click Link  Kaikki asiakkaat
    Page Should Contain  testi oy
    Page Should Contain  asiakas oy

