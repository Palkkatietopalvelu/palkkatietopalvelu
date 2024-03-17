*** Settings ***
Library  SeleniumLibrary  run_on_failure=NOTHING
Library  ../../AppLibrary.py

*** Variables ***
${SERVER}  localhost:5173
${DELAY}  0 seconds
${HOME_URL}  http://${SERVER}

*** Keywords ***
Open And Configure Browser
    ${options}  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys
    Call Method  ${options}  add_argument  --no-sandbox
    Call Method  ${options}  add_argument  --window-size\=1920,1080
    Call Method  ${options}  add_argument  --start-maximized
    Call Method  ${options}  add_argument  --headless
    Open Browser  browser=chrome  options=${options}
    Set Selenium Speed  ${DELAY}

Initialize Database
    Initialize Db

Logged In Page Should Be Open
    Title Should Be  Palkkatietopalvelu
    Wait For  Asiakkaat

Go To Home Page
    Go To  ${HOME_URL}

Go To Login Page
    Go To  ${HOME_URL}/login

Go To Register Page
    Go To  ${HOME_URL}/register

Home Page Should Be Open
    Page Should Contain Element  id=reilu-logo

Set Username
    [Arguments]  ${username}
    Input Text  username  ${username}

Set Password
    [Arguments]  ${password}
    Input Text  password  ${password}

Log Out
    Click Link  KIRJAUDU ULOS

Add New Client
    [Arguments]  ${company}  ${email}  ${phonenumber}  ${bicode}  ${deadline}  ${payperiod}
    Input Text  company  ${company}
    Input Text  email  ${email}
    Input Text  phonenumber  ${phonenumber}
    Input Text  bicode  ${bicode}
    Clear Element Text  deadlines
    Input Text  deadlines  ${deadline}
    Click Element  email
    Input Text  payperiod  ${payperiod}

Setup With Existing User
    Open And Configure Browser
    Initialize Database
    Go To Register Page
    Set Username  testuser@mail.com
    Set Password  123
    Click Button  create
    Go To Login Page
    Set Username  testuser@mail.com
    Set Password  123
    Click Button  login
    Logged In Page Should Be Open

Setup With Existing User And Client
    Open And Configure Browser
    Initialize Database
    Go To Register Page
    Set Username  testuser@mail.com
    Set Password  123
    Click Button  create
    Go To Login Page
    Set Username  testuser@mail.com
    Set Password  123
    Click Button  login
    Logged In Page Should Be Open
    Click Element  Dropdown_Asiakkaat
    Mouse over  Lisää uusi
    Click Element  Lisää uusi
    Add New Client  testi oy  testi@email.com  +358 123456789  1234567-8  2024/11/20  kk
    Click Button  lisää
    Wait For  Asiakas lisätty onnistuneesti

Login As New Client
    ${Link}=  Set Password Link  testi@email.com
    Go To  ${Link}
    Set Password  123
    Set Confirm Password  123
    Click Button  setpassword
    Wait For  Salasana asetettu onnistuneesti
    Go To Login Page
    Set Username  testi@email.com
    Set Password  123
    Click Button  login
    Wait For  Tervetuloa palkkatietopalveluun!

Wait For
    [Arguments]  ${text}
    Wait Until Page Contains  ${text}  timeout=10s