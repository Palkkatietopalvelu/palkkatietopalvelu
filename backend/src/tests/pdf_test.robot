*** Settings ***
Resource  resource.robot
Library  ../AppLibrary.py
Suite Setup  Setup With Existing User And Client
Suite Teardown  Close Browser

*** Test Cases ***
Adding PDF File Succeeds
    Click Link  omat sivut
    Click Link  testi oy
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/test.pdf
    Page Should Contain  PDF-tiedosto lisätty onnistuneesti

Deleting PDF File Succeeds
    Click Button  1              
    Alert Should Be Present
    Page Should Contain  PDF-tiedosto poistettu onnistuneesti

Adding Non PDF File Fails
    Choose File  id=file-upload  ${CURDIR}/files_for_robot_tests/not_a_pdf.txt
    Alert Should Be Present  Lataathan vain PDF-tiedostoja.
