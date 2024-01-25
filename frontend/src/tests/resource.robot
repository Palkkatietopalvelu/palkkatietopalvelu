*** Settings ***
Library ../AccountLibrary.py

*** Variables ***
${SERVER}  localhost:5173
${DELAY}  0.5 seconds
${HOME_URL}  http://${SERVER}

*** Keywords ***
Open And Configure Browser
    Open Browser  browser=chrome

Go To Login Page
    Go To  ${LOGIN_URL}
