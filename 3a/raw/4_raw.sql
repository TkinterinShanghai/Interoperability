-- SQL

SELECT r.material, r.price, r.remarks->>'meta' as remarks, s.phone, s.email, s.active, e.id, e.email FROM
employee e,
servicefacility s,
repairpart r
WHERE
s.id = e.facilityid
AND s.id = r.facilityid
AND s.id < 30;

-- COPY TO CSV

COPY (SELECT r.material, r.price, r.remarks->>'meta' as remarks, s.phone, s.email, s.active, e.id, e.email FROM
employee e,
servicefacility s,
repairpart r
WHERE
s.id = e.facilityid
AND s.id = r.facilityid
AND s.id < 30 limit 10)
TO 'C:\Program Files\PostgreSQL\13\data\interop_ss22\employeeservicefacilityrepairpart.csv' (format csv);