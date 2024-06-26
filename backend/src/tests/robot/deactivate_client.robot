*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Login As Client Succeeds When Active
    Log Out  # logout from admin user
    Login As New Client  testi@email.com  123  # set up password and login to the client user
    Log Out  # logout from the client user

Deactivate Client Succeeds
    Login As Admin
    Go To Home Page
    Click Link  testi oy
    Wait For  20.11.2024  # client has a due date
    Page Should Contain  aktiivinen  # client is active
    Click Button  Muuta asiakkaan tietoja
    Click Button  Aseta epäaktiiviseksi
    Wait For  Asiakkaan asettaminen epäaktiiviseksi
    Click Button  Epäaktivoi
    Wait For  Asiakas on asetettu epäaktiiviseksi
    Page Should Not Contain  Eräpäivät  # can't add due dates when client is deactivated

Deactivated Client Does Not Appear In The Sorting Categories
    Go To Home Page
    Wait For  Aakkosjärjestys
    Page Should Not Contain  testi oy
    Change Sorting Category  Aakkosjärjestys  Eräpäivän mukaan
    Page Should Not Contain  testi oy
    Change Sorting Category  Eräpäivä  Ei myöhässä
    Page Should Not Contain  testi oy
    Change Sorting Category  Ei myöhässä  Myöhässä
    Page Should Not Contain  testi oy

Deactivated Client Appears Only In The Deactivated Category
    Change Sorting Category  Myöhässä  Epäaktiiviset
    Wait For  testi oy
    Page Should Not Contain  20.11.2024  # due dates get deleted
    Page Should Contain  epäaktiivinen  # client has been deactivated
    Log Out

Login Fails As Client When Deactivated
    Go To Login Page
    Set Username  testi@email.com
    Set Password  123
    Submit Credentials
    Login Should Fail With Message  Tili on asetettu epäaktiiviseksi.  # client user acc frozen

Activating Deactivated Client Succeeds
    Login As Admin
    Go To Home Page
    Change Sorting Category  Aakkosjärjestys  Epäaktiiviset
    Click Link  testi oy
    Click Button  Muuta asiakkaan tietoja
    Click Button  Aseta aktiiviseksi
    Wait For  Asiakkaan aktivoiminen
    Click Button  Aktivoi
    Wait For  Asiakas on asetettu aktiiviseksi
    Go To Home Page
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
