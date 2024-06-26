*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Adding File Succeeds
    Log Out
    Login As New Client  testi@email.com  123
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

Files Page Works
    Scroll Element Into View  id=logout
    Log Out
    Login As Admin
    Click Link  AINEISTOT
    Wait For  testi oy

Moving File To Trash Succeeds
    Log Out
    Login As Client  testi@email.com  123
    Go To Home Page
    Move File To Trash  1
    Move File To Trash  2
    Move File To Trash  3
    Page Should Not Contain  .pdf


File Moved To Trash By Client Is Not Visible To Admin
    Log Out
    Login As Admin
    Click Link  AINEISTOT
    Page Should Not Contain  testi oy
    Click Link  KOTI
    Click Link  testi oy
    Click Link  trash
    Page Should Not Contain Element  2palauta
    Click Link  AINEISTOT
    Page Should Not Contain  testi oy
    Log Out

Deleting File From Trash Succeeds
    Login As Client   testi@email.com   123
    Click Link  trash
    Delete File  1poista
    Delete File  2poista
    Delete File  3poista

Admin Can Mark Files Delivered
    Go To Home Page
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/test.pdf
    Wait For  Tiedosto lisätty onnistuneesti
    Log Out
    Login As Admin
    Click Link  testi oy
    Page Should Contain   Eräpäivän 20.11.2024 palkkatiedot
    Click Button  Merkitse palkkatiedot toimitetuksi
    Wait For  Tiedot toimitetuksi
    Click Button  Merkkaa toimitetuksi
    Wait For  Tiedosto siirretty roskakoriin
    Page Should Not Contain  20.11.2024
    Page Should Not Contain  .pdf
    Wait For  Ei nyt
    Click Button  Ei nyt
    # delete added files:
    Click Link  trash
    Delete File  4poista
  
Files Page All Clients Filter Works
    Setup With Two Existing Users And Two Clients
    Log Out
    Login As New Client  asiakas@email.com  asiakas
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/test.pdf
    Wait For  Tiedosto lisätty onnistuneesti
    Log Out
    Login As New Client  testi@email.com  123
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/test.pdf
    Wait For  Tiedosto lisätty onnistuneesti
    Log Out
    Login As Admin
    Click Link  AINEISTOT
    Page Should Contain  testi oy
    Page Should Not Contain  asiakas oy
    Click Link  Omat asiakkaat
    Click Link  Kaikki asiakkaat
    Page Should Contain  testi oy
    Page Should Contain  asiakas oy
    # delete added files:
    Click link  asiakas oy
    Move File To Trash  1
    Go To Home Page
    Click Link  testi oy
    Move File To Trash  2
    Click Link  trash
    Delete File  1poista
    Delete File  2poista



*** Keywords ***
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

Move File To Trash
    [Arguments]  ${file_id}
    Click Button  ${file_id}
    Wait For  Tiedoston siirtäminen roskakoriin
    Click Button  Siirrä roskakoriin
    Wait For  Tiedosto siirretty roskakoriin

Delete File
    [Arguments]  ${button_id}
    Click Button  ${button_id}
    Wait For  Tiedoston poistaminen
    Click Button  Poista tiedosto
    Wait For  Tiedosto poistettu onnistuneesti