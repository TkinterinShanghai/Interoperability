#!/bin/bash

curl --location --request POST 'localhost:9881/ComplaintOverview/complaint/customer/Maci_Johns@yahoo.com/adress' \
--header 'Content-Type: application/json' \
--data-raw '{
    "payload": {
        "adress": [
            {
                "$": {
                    "zip": 2000,
                    "country": "AT"
                },
                "street": [
                    {
                        "name": ["Long Street"],
                        "number": [200000000]
                    }
                ]
            }
        ]
    }
}'