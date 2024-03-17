*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User
Suite Teardown  Close Browser

*** Test Cases ***
Dropdown Item ASIAKKAAT shows all options on the list
    Page Should Contain  ASIAKKAAT
    Click Element  Dropdown_Asiakkaat
    Page Should Contain  Lisää uusi
    Page Should Contain  Omat
    Page Should Contain  Kaikki
    Page Should Contain  Aktiiviset
    Page Should Contain  Deaktivoidut

Add Client Succeeds With Correct Credentials
    Go To Home Page
    Home Page Should Be Open
    Click Element  Dropdown_Asiakkaat
    Mouse over  Lisää uusi
    Click Element  Lisää uusi
    Add New Client  testi oy  testi@email.com  +358 123456789  1234567-8  2025/02/12, 2024/12/04, 2024/05/07  kk
    Click Button  Lisää
    Wait For  Asiakas lisätty onnistuneesti

Add Client Fails With Wrong Email Format
    Home Page Should Be Open
    Click Element  Dropdown_Asiakkaat
    Mouse over  Lisää uusi
    Click Element  Lisää uusi
    Add New Client  test oy  wrongemail  +358 123456789  1234567-8  2024/12/12  kk
    Click Button  Lisää
    Wait For  Sähköposti ei ole oikeassa muodossa

Add Client Fails With Wrong Phonenumber Format
    Go To Home Page
    Home Page Should Be Open
    Click Element  Dropdown_Asiakkaat
    Mouse over  Lisää uusi
    Click Element  Lisää uusi
    Add New Client  test oy  test@email.com  123 123456789  1234567-8  2024/12/12  kk
    Click Button  Lisää
    Wait For  Puhelinnumero ei ole oikeassa muodossa

Add Client Fails With Wrong BIcode Format
    Go To Home Page
    Home Page Should Be Open
    Click Element  Dropdown_Asiakkaat
    Mouse over  Lisää uusi
    Click Element  Lisää uusi
    Add New Client  test oy  test@email.com  +358 123456789  12345678  2024/12/12  kk
    Click Button  Lisää
    Wait For  Y-tunnus ei ole oikeassa muodossa

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
