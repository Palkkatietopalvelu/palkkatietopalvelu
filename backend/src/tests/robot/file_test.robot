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
    Add New Monthly Employee    employee_name1  tammikuu  120   1230    1, 2,50€    ei valkosipulia
    Scroll Element Into View    id=lisää
    Click Button  Lisää työntekijän tiedot lomakkeelle
    Add New Hourly Employee    employee_name2  tammikuu  100    120    3    50
    Scroll Element Into View    id=lisää
    Click Button  Lisää työntekijän tiedot lomakkeelle
    Scroll Element Into View    id=tallenna
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

Restoring File Succeeds
    Click Link  trash
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
    Log Out

Deleting File From Trash Succeeds
    Login As New Client
    Click Link  trash
    Click Button  1poista
    Wait For  Tiedoston poistaminen
    Click Button  Poista tiedosto
    Wait For  Tiedosto poistettu onnistuneesti
    Click Button  2poista
    Wait For  Tiedoston poistaminen
    Click Button  Poista tiedosto
    Wait For  Tiedosto poistettu onnistuneesti

*** Keywords ***
Set Confirm Password
    [Arguments]  ${confirmPassword}
    Input Password  confirmPassword  ${confirmPassword}

Add New Monthly Employee
    [Arguments]  ${employee_name}  ${month}  ${total_hours_weekdays}  ${wage_monthly}  ${mileage_allowance}  ${extra}
    Input Text  employee name  ${employee_name}
    Input Text  month  ${month}
    Input Text  total_hours_weekdays  ${total_hours_weekdays}
    Input Text  wage_monthly  ${wage_monthly}
    Input Text  mileage_allowance  ${mileage_allowance}
    Input Text  extra  ${extra}

Add New Hourly Employee
    [Arguments]  ${employee_name}  ${month}  ${total_hours_weekdays}  ${wage_hourly}  ${sport_benefit}  ${sport_benefit_value}
    Input Text  employee name  ${employee_name}
    Input Text  month  ${month}
    Input Text  total_hours_weekdays  ${total_hours_weekdays}
    Input Text  wage_hourly  ${wage_hourly}
    Input Text  sport_benefit  ${sport_benefit}
    Input Text  sport_benefit_value  ${sport_benefit_value}
