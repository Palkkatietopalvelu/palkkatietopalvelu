#!/bin/bash

cd backend
poetry run invoke start

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:5000/ping)" != "200" ]]; 
  do sleep 1; 
done

poetry run invoke robottests

status=$?

kill $(lsof -t -i:5000)

exit $status
