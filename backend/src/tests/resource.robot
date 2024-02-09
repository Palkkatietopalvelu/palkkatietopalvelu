*** Settings ***
Library  SeleniumLibrary  run_on_failure=NOTHING
Library  ../AppLibrary.py

*** Variables ***
${SERVER}  localhost:5173
${DELAY}  0.5 seconds
${HOME_URL}  http://${SERVER}

*** Keywords ***
Open And Configure Browser
    ${options}  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys
    Call Method    ${options}    add_argument    --no-sandbox
    Call Method  ${options}  add_argument  --headless
    Open Browser  browser=chrome  options=${options}
    Set Selenium Speed  ${DELAY}

Initialize Database
    Initialize Db

Logged In Page Should Be Open
    Title Should Be  Vite + React
    Page Should Contain  kirjautunut sisään

Go To Home Page
    Go To  ${HOME_URL}

Go To Login Page
    Go To  ${HOME_URL}/login

Go To Register Page
    Go To  ${HOME_URL}/register

Home Page Should Be Open
    Page Should Contain  Palkkatietopalvelu
