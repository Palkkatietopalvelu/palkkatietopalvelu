*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Adding File Succeeds
    Log Out
    Login As New Client
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/test.pdf
    Wait For  Tiedosto lisätty onnistuneesti

Adding Wrong Filetype Fails
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/not_a_pdf.txt
    Alert Should Be Present  Lataathan vain PDF, Word, Excel, tai CSV tiedostoja.

Adding File Succesfully With Salary Form
    Go To Home Page
    Click Link    täällä
    Add New Monthly Employee    employee_name1    2025/02/12, 2024/12/04, 2024/05/07    123    2    1, 2,50€    50    20    ei valkosipulia
    Click Button  Lisää työntekijän tiedot lomakkeelle
    Add New Hourly Employee    employee_name2    2025/02/12, 2024/12/04, 2024/05/07    120    3    50    20
    Click Button  Lisää työntekijän tiedot lomakkeelle
    Click Button  Tallenna lomake
    Wait For  Tiedosto lisätty onnistuneesti

Moving File To Trash Succeeds
    Go To Home Page
    Click Button  1
    Wait For  Tiedoston siirtäminen roskakoriin
    Click Button  Siirrä roskakoriin
    Wait For  Tiedosto siirretty roskakoriin
    Click Button  2
    Wait For  Tiedoston siirtäminen roskakoriin
    Click Button  Siirrä roskakoriin
    Wait For  Tiedosto siirretty roskakoriin

Deleting File From Trash Succeeds
    Click Link  trash
    Click Button  1poista                          
    Wait For  Tiedoston poistaminen
    Click Button  Poista tiedosto
    Wait For  Tiedosto poistettu onnistuneesti

Restoring File Succeeds
    Click Button  2palauta 
    Wait For  Tiedosto palautettu onnistuneesti

File Moved To Trash By Client Is Not Visible To Admin
    Go To Home Page
    Click Button  2              
    Wait For  Tiedoston siirtäminen roskakoriin
    Click Button  Siirrä roskakoriin
    Wait For  Tiedosto siirretty roskakoriin
    Log Out
    Login As Admin
    Click Link  OMAT SIVUT
    Click Link  testi oy
    Click Link  trash
    Page Should Not Contain Element  2palauta

*** Keywords ***
Set Confirm Password
    [Arguments]  ${confirmPassword}
    Input Password  confirmPassword  ${confirmPassword}

Add New Monthly Employee
    [Arguments]  ${employee_name}  ${absences}  ${provisions}  ${overtime}  ${lunch_allowance}  ${daily_allowance}  ${mileage_allowance}  ${extra}
    Input Text  employee name  ${employee_name}
    Clear Element Text  absences
    Input Text    absences   ${absences}
    Click Element  id=provisions
    Input Text  provisions  ${provisions}
    Input Text  overtime  ${overtime}
    Input Text  lunch_allowance  ${lunch_allowance}
    Input Text  daily_allowance  ${daily_allowance}
    Input Text  mileage_allowance  ${mileage_allowance}
    Input Text  extra  ${extra}

Add New Hourly Employee
    [Arguments]  ${employee_name}  ${absences}  ${lunch_allowance}  ${daily_allowance}  ${mileage_allowance}  ${total_hours}
    Click Element    id=hourly
    Input Text  employee name  ${employee_name}
    Clear Element Text  absences
    Input Text    absences    ${absences}
    Click Element  id=lunch_allowance
    Input Text  lunch_allowance  ${lunch_allowance}
    Input Text  daily_allowance  ${daily_allowance}
    Input Text  mileage_allowance  ${mileage_allowance}
    Input Text  total_hours  ${mileage_allowance}
