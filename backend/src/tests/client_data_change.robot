*** Settings ***
Resource  resource.robot
Library  ../AppLibrary.py
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Change Client Company Succeeds
    Click Link  omat sivut
    Click Link  testi oy
    Click Link  Muuta asiakkaan tietoja
    Change Company Name  eiku oy
    Click Button  Tallenna tiedot
    Page Should Contain  Asiakkaan tiedot päivitetty onnistuneesti

Change Client Email With Correct Format Succeeds
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Change Email  testi@eiku.com
    Click Button  Tallenna tiedot
    Page Should Contain  Asiakkaan tiedot päivitetty onnistuneesti

Change Client Email With Incorrect Format Fails
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Change Email  vääräemail
    Click Button  Tallenna tiedot
    Page Should Contain  Sähköposti ei ole oikeassa muodossa
    
Change Client Phonenumber With Correct Format Succeeds
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Change Phonenumber  +358 111111111
    Click Button  Tallenna tiedot
    Page Should Contain  Asiakkaan tiedot päivitetty onnistuneesti

Change Client Phonenumber With Incorrect Format Fails
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Change Phonenumber  123123456789
    Click Button  Tallenna tiedot
    Page Should Contain  Puhelinnumero ei ole oikeassa muodossa

Change Client BICode With Correct Format Succeeds
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Change BICode  1234567-9
    Click Button  Tallenna tiedot
    Page Should Contain  Asiakkaan tiedot päivitetty onnistuneesti

Change Client BICode With Incorrect Format Fails
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Change BICode  123
    Click Button  Tallenna tiedot
    Page Should Contain  Y-tunnus ei ole oikeassa muodossa

Change Client Deadline With Correct Format Succeeds
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Change Deadline  2023-01-01
    Click Button  Tallenna tiedot
    Page Should Contain  Asiakkaan tiedot päivitetty onnistuneesti

Change Client Deadline With Incorrect Format Fails
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Change Deadline  01-01-2023
    Click Button  Tallenna tiedot
    Page Should Contain  Eräpäivä ei ole oikeassa muodossa

Change Client Payperiod Succeeds
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Change Payperiod  2 vko
    Click Button  Tallenna tiedot
    Page Should Contain  Asiakkaan tiedot päivitetty onnistuneesti

Delete Client Succeeds
    Click Link  omat sivut
    Click Link  eiku oy
    Click Link  Muuta asiakkaan tietoja
    Click Button  Poista asiakas
    Alert Should Be Present  Haluatko varmasti poistaa asiakkaan eiku oy?
    Page Should Contain  Asiakkaan tiedot poistettu onnistuneesti

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

Change Deadline
    [Arguments]  ${deadline}
    Input Text  deadline  ${deadline}

Change Payperiod
    [Arguments]  ${payperiod}
    Input Text  payperiod  ${payperiod}
