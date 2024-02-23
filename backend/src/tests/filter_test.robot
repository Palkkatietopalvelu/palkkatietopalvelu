*** Settings ***
Resource  resource.robot
Library  ../AppLibrary.py
Suite Setup  Setup With Existing User
Suite Teardown  Close Browser

*** Test Cases ***
Search Company With Correct Name Credentials
    Home Page Should Be Open
    Click Link  LISÄÄ ASIAKAS
    Add New Client  Firma Oy  firma@mail.com  +358 123456789  1234567-8  2024/05/07  kk
    Click Button  Lisää
    Add New Client  Kallen kiska  kalle@kiska.fi  +358 123456789  1234567-8  2024/02/12  kk
    Click Button  Lisää
    Click Link  OMAT SIVUT
    Search Company  fir
    Page Should Contain  Firma
    Page Should Contain  07.05.2024
    Page Should Not Contain  Kallen kiska

Search Company With Incorrect Name Credentials
    Click Link  OMAT SIVUT
    Search Company  Nokia
    Page Should Not Contain  Nokia
    Page Should Not Contain  Firma
    Page Should Not Contain  Kallen kiska

Search Company With Correct DueDate Credentials
    Click Link  KOTI
    Click Link  OMAT SIVUT
    Search DueDate  12
    Page Should Contain  Kallen kiska
    Page Should Contain  12.02.2024
    Page Should Not Contain  Firma
    Page Should Not Contain  Nokia

Search Company With Incorrect DueDate Credentials
    Click Link  OMAT SIVUT
    Search DueDate  11
    Page Should Not Contain  Kallen kiska
    Page Should Not Contain  Firma
    Page Should Not Contain  Nokia

Search Company With Correct Month
    Click Link  OMAT SIVUT
    Search DueDate  may
    Page Should Contain  07.05.2024
    Page Should Contain  Firma
    Page Should Not Contain  Kallen kiska
    Page Should Not Contain  Nokia

Search Company With Incorrect Month
    Click Link  OMAT SIVUT
    Search DueDate  dec
    Page Should Not Contain  07.05.2024
    Page Should Not Contain  12.02.2024
    Page Should Not Contain  Firma
    Page Should Not Contain  Kallen kiska
    Page Should Not Contain  Nokia

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

Search Company
    [Arguments]  ${companyFilter}
    Input Text  companyFilter  ${companyFilter}

Search DueDate
    [Arguments]  ${dueDateFilter}
    Input Text  dueDateFilter  ${dueDateFilter}
