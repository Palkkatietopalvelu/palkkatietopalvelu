*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Sending Manual Email Reminder Fails When No Company Is Selected
    Click Element  Dropdown_Muistutukset
    Mouse Over  Manual
    Click Element  Manual
    Click Button  Lähetä
    Wait For  Valitse vähintään yksi vastaanottaja

Sending Manual Email Reminder Succeeds When A Company Is Selected
    Click Element  Dropdown_Muistutukset
    Mouse Over  Manual
    Click Element  Manual
    Select Checkbox  1
    Click Button  Lähetä
    Wait For  Sähköpostimuistutukset lähetetty

Turning On Automatic Email Reminder Succeeds
    Go To Home Page
    Click Element  Dropdown_Muistutukset
    Mouse Over  Automatic
    Click Element  Automatic
    Wait For  Automaattiset muistutukset eivät ole käytössä
    Click Button  Muokkaa
    Click Element  //*[@class='react-switch-handle']
    Wait For  Automaattiset muistutukset käytössä.
    Click Button  Tallenna
    Wait For  Asetukset tallennettu

Turning On Automatic Email Reminder Fails Without Email Checkbox Selected
    Unselect Checkbox  email
    Click Button  Tallenna
    Wait For  Valitse ainakin yksi lähetystapa

Turning On Automatic Email Reminder Fails Without Sending Day Selected
    Select Checkbox  email
    Unselect Checkbox  day-0
    Click Button  Tallenna
    Wait For  Valitse ainakin yksi lähetyspäivä

Turning Off Automatic Email Reminder Succeeds
    Go To Home Page
    Click Element  Dropdown_Muistutukset
    Mouse Over  Automatic
    Click Element  Automatic
    Wait For  Automaattiset muistutukset
    Click Button  Muokkaa
    Wait For  Automaattiset muistutukset käytössä.
    Click Element  //*[@class='react-switch-handle']
    Wait For  Automaattiset muistutukset pois käytöstä.
    Click Button  Tallenna
    Wait For  Asetukset tallennettu
