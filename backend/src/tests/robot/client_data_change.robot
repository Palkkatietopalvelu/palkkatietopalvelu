*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Change Client Company Succeeds
    Click Link  KOTI
    Click Link  testi oy
    Click Button  Muuta asiakkaan tietoja
    Change Company Name  eiku oy
    Click Button  Tallenna tiedot
    Wait For  Asiakkaan tiedot päivitetty onnistuneesti
    Wait Until Page Does Not Contain  Asiakkaan tiedot päivitetty onnistuneesti  timeout=6s

Change Client Email With Correct Format Succeeds
    Click Link  KOTI
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Change Email  testi@eiku.com
    Click Button  Tallenna tiedot
    Wait For  Asiakkaan tiedot päivitetty onnistuneesti
    Wait Until Page Does Not Contain  Asiakkaan tiedot päivitetty onnistuneesti  timeout=6s

Change Client Email With Incorrect Format Fails
    Click Link  KOTI
    Wait For  eiku oy
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Change Email  vääräemail
    Click Button  Tallenna tiedot
    Wait For  Sähköposti ei ole oikeassa muodossa
    
Change Client Phonenumber With Correct Format Succeeds
    Click Link  KOTI
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Change Phonenumber  +358 111111111
    Click Button  Tallenna tiedot
    Wait For  Asiakkaan tiedot päivitetty onnistuneesti

Change Client Phonenumber With Incorrect Format Fails
    Click Link  KOTI
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Change Phonenumber  123123456789
    Click Button  Tallenna tiedot
    Wait For  Puhelinnumero ei ole oikeassa muodossa

Change Client BICode With Correct Format Succeeds
    Click Link  KOTI
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Change BICode  1234567-9
    Click Button  Tallenna tiedot
    Wait For  Asiakkaan tiedot päivitetty onnistuneesti

Change Client BICode With Incorrect Format Fails
    Click Link  KOTI
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Change BICode  123
    Click Button  Tallenna tiedot
    Wait For  Y-tunnus ei ole oikeassa muodossa

Change Client Deadlines With Correct Format Succeeds
    Click Link  KOTI
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Change Deadlines  2023/01/01, 2024/01/02
    Click Button  Tallenna tiedot
    Wait For  Asiakkaan tiedot päivitetty onnistuneesti

Change Client Deadlines With Incorrect Format Fails
    Click Link  KOTI
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Change Deadlines  01/01/2023, 23/04/2025
    Page Should Not Contain  01/01/2023, 23/04/2025

Change Client Payperiod Succeeds
    Click Link  KOTI
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Change Payperiod  2 vko
    Click Button  Tallenna tiedot
    Wait For  Asiakkaan tiedot päivitetty onnistuneesti
    Wait Until Page Does Not Contain  Asiakkaan tiedot päivitetty onnistuneesti  timeout=6s

Delete Client Succeeds
    Click Link  KOTI
    Click Link  eiku oy
    Click Button  Muuta asiakkaan tietoja
    Click Button  Poista asiakas
    Wait For  Asiakkaan poistaminen
    Click Button  Poista
    Wait For  Asiakkaan tiedot poistettu onnistuneesti

*** Keywords ***
Change Company Name
    [Arguments]  ${company}
    Input Text  company  ${company}

Change Email
    [Arguments]  ${email}
    Input Text  email  ${email}

Change Phonenumber
    [Arguments]  ${phonenumber}
    Input Text  phonenumber  ${phonenumber}

Change BICode
    [Arguments]  ${bicode}
    Input Text  bicode  ${bicode}

Change Deadlines
    [Arguments]  ${deadline}
    Clear Element Text  deadlines
    Input Text  deadlines  ${deadline}
    Click Element  email

Change Payperiod
    [Arguments]  ${payperiod}
    Input Text  payperiod  ${payperiod}
