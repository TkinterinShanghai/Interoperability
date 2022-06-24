#!/bin/bash

curl --location --request GET 'localhost:9881/CustomerComplaintAppointment/appointment/complaint' \
--header 'Content-Type: application/json' \
--data-raw '{
    "importance": 3
}'