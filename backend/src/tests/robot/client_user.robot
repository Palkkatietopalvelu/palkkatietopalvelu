*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Login With Client User Link Succeeds And Link Expires After Use
    Log Out
    ${Link}  Set Password Link  testi@email.com
    Go To  ${Link}
    Set Password  123
    Set Confirm Password  123
    Click Button  setpassword
    Wait For  Salasana asetettu onnistuneesti
    Wait Until Page Does Not Contain  Salasana asetettu onnistuneesti
    Go To  ${Link}
    Page Should Contain  Token on vanhentunut tai väärä

Login With Correct Client User Credentials Succeeds
    Go To Login Page
    Set Username  testi@email.com
    Set Password  123
    Click Button  login
    Wait For  Tervetuloa palkkatietopalveluun!

Client User View Is Correct
    Page Should Not Contain  MUISTUTUKSET
    Page Should Not Contain  LISÄÄ ASIAKAS
    Page Should Not Contain  MUISTUTUSASETUKSET
    Page Should Contain  Tervetuloa palkkatietopalveluun!
    Click Link  OMAT SIVUT
    Page Should Not Contain  Omat asiakkaat

Change Client User Password Succeeds With Valid Info
    Go To My Page And Open Change Password Form
    Set Old Password  123
    Set New Password  eiku123
    Set New Password Again  eiku123
    Wait Until Page Does Not Contain  Salasana ei saa olla yli 15 merkkiä pitkä
    Change Password
    Wait For  Salasana vaihdettu onnistuneesti
    Log Out

*** Keywords ***
Go To My Page And Open Change Password Form
    Click Link  OMAT SIVUT
    Page Should Contain  Käyttäjätilin asetukset
    Click Button  Vaihda salasana

Change Password
    Click Button  change-password

Set Old Password
    [Arguments]  ${password}
    Input Password  oldPassword  ${password}

Set New Password
    [Arguments]  ${password}
    Input Password  newPassword  ${password}

Set New Password Again
    [Arguments]  ${password}
    Input Password  confirmPassword  ${password}

Set Confirm Password
    [Arguments]  ${confirmPassword}
    Input Password  confirmPassword  ${confirmPassword}
