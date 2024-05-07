*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Sending Manual Email Reminder Succeeds When A Company Is Selected
    Click Element  Dropdown_Muistutukset
    Mouse Over  Manual
    Click Element  Manual
    Wait For  Valitse asiakkaat, joille muistutus lähetetään
    Select Checkbox  mail1
    Click Button  Lähetä
    Wait For  Sähköpostimuistutukset lähetetty

Sending Manual Email Reminder Fails When No Company Is Selected
    Click Element  Dropdown_Muistutukset
    Mouse Over  Manual
    Click Element  Manual
    Unselect Checkbox  mail1
    Click Button  Lähetä
    Wait For  Valitse vähintään yksi vastaanottaja

Turning On Automatic Email Reminder Succeeds
    Click Element  Dropdown_Muistutukset
    Mouse Over  Automatic
    Click Element  Automatic
    Wait For  Automaattiset muistutukset eivät ole käytössä
    Click Button  Muokkaa
    Click Element  //*[@class='react-switch-handle']
    Wait For  Automaattiset muistutukset käytössä.
    Unselect Checkbox  sms
    Select Checkbox  email
    Checkbox Should Be Selected  email
    Checkbox Should Not Be Selected  sms
    Click Button  Tallenna
    Wait For  Asetukset tallennettu

Turning On Automatic Email Reminder Fails Without Email Checkbox Selected
    Unselect Checkbox  email
    Checkbox Should Not Be Selected  email
    Click Button  Tallenna
    Wait For  Valitse ainakin yksi lähetystapa

Turning On Automatic Email Reminder Fails Without Sending Day Selected
    Select Checkbox  email
    Unselect Days
    Scroll Element Into View   id=tallenna
    Click Button  Tallenna
    Wait For  Valitse ainakin yksi lähetyspäivä
    Select Checkbox  day-0

Turning Off Automatic Email Reminder Succeeds
    Click Element  //*[@class='react-switch-handle']
    Wait For  Automaattiset muistutukset pois käytöstä.
    Click Button  Tallenna
    Wait For  Asetukset tallennettu
