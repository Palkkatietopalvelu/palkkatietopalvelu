*** Settings ***
Library  SeleniumLibrary
Library  ../AccountLibrary.py

*** Variables ***
${SERVER}  localhost:5173
${DELAY}  0.5 seconds
${HOME_URL}  http://${SERVER}

*** Keywords ***
Open And Configure Browser
    ${options}  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys
    Call Method    ${options}    add_argument    --no-sandbox
    # Call Method  ${options}  add_argument  --headless
    Open Browser  browser=chrome  options=${options}
    Set Selenium Speed  ${DELAY}

Main Page Should Be Open
    Title Should Be  Log in to application

Go To Starting Page
    Go To  ${HOME_URL}
