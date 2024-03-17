*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User
Suite Teardown  Close Browser

*** Test Cases ***
Search Company With Correct Name
    Home Page Should Be Open
    Click Element  Dropdown_Asiakkaat
    Mouse over  Lisää uusi
    Click Element  Lisää uusi
    Add New Client  Firma Oy  firma@mail.com  +358 123456789  1234567-8  2024/05/07  kk
    Click Button  Lisää
    Wait For  Asiakas lisätty onnistuneesti
    Add New Client  Kallen kiska  kalle@kiska.fi  +358 123456789  1234567-8  2024/02/12  kk
    Click Button  Lisää
    Wait For  Asiakas lisätty onnistuneesti
    Click Link  OMAT SIVUT
    Search Company  fir
    Wait Until Page Does Not Contain  Kallen kiska  timeout=6s
    Wait For  Firma
    Wait For  07.05.2024

Search Company With Incorrect Name
    Click Link  OMAT SIVUT
    Search Company  Nokia
    Page Should Not Contain  Nokia
    Page Should Not Contain  Firma
    Page Should Not Contain  Kallen kiska

Search Company With Correct Date
    Click Link  KOTI
    Click Link  OMAT SIVUT
    Search Date  12
    Wait For  Kallen kiska
    Wait For  12.02.2024
    Page Should Not Contain  Firma
    Page Should Not Contain  Nokia

Search Company With Incorrect Date
    Click Link  OMAT SIVUT
    Search Date  11
    Page Should Not Contain  Kallen kiska
    Page Should Not Contain  Firma
    Page Should Not Contain  Nokia

Search Company With Correct Month
    Click Link  OMAT SIVUT
    Search Date  .05.
    Wait For  07.05.2024
    Wait For  Firma
    Page Should Not Contain  Kallen kiska
    Page Should Not Contain  Nokia

Search Company With Incorrect Month
    Click Link  OMAT SIVUT
    Search Date  dec
    Page Should Not Contain  07.05.2024
    Page Should Not Contain  12.02.2024
    Page Should Not Contain  Firma
    Page Should Not Contain  Kallen kiska
    Page Should Not Contain  Nokia

*** Keywords ***
Search Company
    [Arguments]  ${companyFilter}
    Input Text  companyFilter  ${companyFilter}

Search Date
    [Arguments]  ${dateFilter}
    Input Text  dateFilter  ${dateFilter}
