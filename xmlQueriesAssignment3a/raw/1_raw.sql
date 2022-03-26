-- SQL

SELECT f.fridge_type, f.price, c.email, c.adress, c.lastActive, p.isresolved, p.issueDate FROM
customer c,
fridge f,
complaint p
WHERE
p.fridgeid = f.id
AND p.customerid = c.id
AND f.id < 30;

-- COPY TO CSV

COPY (SELECT f.fridge_type, f.price, c.email, c.adress, c.lastActive, p.isresolved, p.issueDate FROM
customer c,
fridge f,
complaint p
WHERE
p.fridgeid = f.id
AND p.customerid = c.id
AND f.id < 30 limit 10) TO 'C:\Program Files\PostgreSQL\13\data\interop_ss22\customerfridgecomplaint.csv' (format csv);