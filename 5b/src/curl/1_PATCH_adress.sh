#!/bin/bash

curl --location --request PATCH 'localhost:9881/AppointmentOverview/appointment/employee/0/adress' \
--header 'Content-Type: application/json' \
--data-raw '{
    "zip": 12345,
    "streetName": "new Street"
}'