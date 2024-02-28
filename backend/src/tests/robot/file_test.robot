*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Adding File Succeeds
    Log Out
    Login As New Client
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/test.pdf
    Page Should Contain  Tiedosto lisätty onnistuneesti

Deleting File Succeeds
    Click Button  1              
    Alert Should Be Present
    Page Should Contain  Tiedosto poistettu onnistuneesti
