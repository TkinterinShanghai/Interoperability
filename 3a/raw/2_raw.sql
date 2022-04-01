-- SQL

SELECT c.fridgeid, c.isresolved, c.issueDate, a.handled, a.rating, a.id, e.adress, e.id FROM
appointment a,
employee e,
complaint c
WHERE
a.employeeid = e.id
AND a.complaintid = c.id
AND a.id < 30;

-- COPY TO CSV

COPY (SELECT c.fridgeid, c.isresolved, c.issueDate, a.handled, a.rating, a.id, e.adress, e.id FROM
appointment a,
employee e,
complaint c
WHERE
a.employeeid = e.id
AND a.complaintid = c.id
AND a.id < 30 limit 10)
TO 'C:\Program Files\PostgreSQL\13\data\interop_ss22\appointmentemployeecomplaint.csv' (format csv);