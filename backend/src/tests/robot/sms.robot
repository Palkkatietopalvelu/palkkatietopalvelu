*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Sending Manual Sms Reminder Succeeds
    Click Element  Dropdown_Muistutukset
    Mouse Over  Manual
    Click Element  Manual
    Select Checkbox  sms1
    Click Button  Lähetä
    Wait For  Tekstiviestimuistutukset lähetetty

Sending Manual Sms Reminder Fails When No Company Is Selected
    Click Element  Dropdown_Muistutukset
    Mouse Over  Manual
    Click Element  Manual
    Unselect Checkbox  sms1
    Click Button  Lähetä
    Wait For  Valitse vähintään yksi vastaanottaja
