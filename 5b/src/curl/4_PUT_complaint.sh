#!/bin/bash

curl --location --request PUT 'localhost:9881/AppointmentOverview/appointment/2021-12-31/complaint' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content": {
        "fridgeId": 0,
        "isResolved": true,
        "issueDate": "2021-12-12"
    }
}'