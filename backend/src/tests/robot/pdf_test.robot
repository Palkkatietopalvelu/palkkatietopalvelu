*** Settings ***
Resource  resource.robot
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
<<<<<<<< HEAD:backend/src/tests/file_test.robot
Adding File Succeeds
    Log Out
    Login As Client
========
Adding PDF File Succeeds
    Click Link  OMAT SIVUT
    Click Link  testi oy
>>>>>>>> 6ad4d8b (update robot tests; move them in a separate folder):backend/src/tests/robot/pdf_test.robot
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/test.pdf
    Page Should Contain  Tiedosto lisätty onnistuneesti

Deleting File Succeeds
    Click Button  1              
    Alert Should Be Present
    Page Should Contain  Tiedosto poistettu onnistuneesti

Adding Wrong Filetype Fails
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/not_a_pdf.txt
    Alert Should Be Present  Lataathan vain PDF, Word, Excel, tai CSV tiedostoja.
