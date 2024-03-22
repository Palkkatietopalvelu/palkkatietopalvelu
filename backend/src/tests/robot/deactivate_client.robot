*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Login As Client Succeeds When Active
    Log Out  # logout from admin user
    Login As New Client  # set up password and login to the client user
    Log Out  # logout from the client user

Deactivate Client Succeeds
    Login As Admin
    Click Link  OMAT SIVUT
    Click Link  testi oy
    Wait For  20.11.2024  # client has a due date
    Page Should Contain  aktiivinen  # client is active
    Click Button  Muuta asiakkaan tietoja
    Click Button  Deaktivoi asiakas
    Wait For  Asiakkaan deaktivoiminen
    Click Button  Deaktivoi
    Wait For  Asiakas deaktivoitu

Deactivated Client Does Not Appear In The Sorting Categories
    Click Link  OMAT SIVUT
    Wait For  Aakkosjärjestys
    Page Should Not Contain  testi oy
    Change Sorting Category  Aakkosjärjestys  Eräpäivän mukaan
    Page Should Not Contain  testi oy
    Change Sorting Category  Eräpäivä  Ei myöhässä
    Page Should Not Contain  testi oy
    Change Sorting Category  Ei myöhässä  Myöhässä
    Page Should Not Contain  testi oy

Deactivated Client Appears Only In The Deactivated Category
    Change Sorting Category  Myöhässä  Deaktivoidut
    Wait For  testi oy
    Page Should Not Contain  20.11.2024  # due dates get deleted
    Page Should Contain  epäaktiivinen  # client has been deactivated
    Log Out

Login Fails As Client When Deactivated
    Go To Login Page
    Set Username  testi@email.com
    Set Password  123
    Submit Credentials
    Login Should Fail With Message  Tili jäädytetty deaktivoinnin takia.  # client user acc frozen

Activating Deactivated Client Succeeds
    Login As Admin
    Click Link  OMAT SIVUT
    Change Sorting Category  Aakkosjärjestys  Deaktivoidut
    Click Link  testi oy
    Click Button  Muuta asiakkaan tietoja
    Click Button  Aktivoi asiakas
    Wait For  Asiakkaan aktivoiminen
    Click Button  Aktivoi
    Wait For  Asiakas aktivoitu
    Click Link  OMAT SIVUT
    Wait For  testi oy

*** Keywords ***
Change Sorting Category
    [Arguments]  ${category1}  ${category2}
    Click Link  ${category1}
    Click Link  ${category2}

Login Should Fail With Message
    [Arguments]  ${msg}
    Wait For  ${msg}

Submit Credentials
    Click Button  Kirjaudu
