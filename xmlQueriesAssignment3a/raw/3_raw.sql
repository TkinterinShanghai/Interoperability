-- SQL

SELECT a.handled, a.rating, c.isResolved, c.issueDate, c.id, u.remarks->'meta'->'importance' as importance, u.remarks->'text' as remarkstext FROM
appointment a,
customer u,
complaint c
WHERE
c.customerid = u.id
AND c.id = a.complaintid
AND a.id < 30;

-- COPY TO CSV

COPY (SELECT a.handled, a.rating, c.isResolved, c.issueDate, c.id, u.remarks->'meta'->'importance' as importance, u.remarks->'text' as remarkstext FROM
appointment a,
customer u,
complaint c
WHERE
c.customerid = u.id
AND c.id = a.complaintid
AND a.id < 30 limit 10)
TO 'C:\Program Files\PostgreSQL\13\data\interop_ss22\appointmentcustomercomplaint.csv' (format csv);