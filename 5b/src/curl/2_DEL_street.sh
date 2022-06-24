#!/bin/bash

curl --location --request DELETE 'localhost:9881/AppointmentOverview/appointment/2.48/employee/adress/street' \
--header 'Content-Type: application/json' \
--data-raw '{
    "rating": 2.48
}'