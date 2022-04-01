SELECT XMLROOT(XMLELEMENT(NAME
    "ComplaintOverview", XMLAGG(XMLELEMENT(NAME
    "complaint", xmlattributes(p.id,p.isresolved, p.issuedate), 
    XMLELEMENT(NAME "customer", XMLFOREST(c.email, c.lastActive, c.adress)), 
    XMLELEMENT(NAME "fridge", XMLFOREST(f.fridge_type, f.price))
    ))
    ),
    VERSION '1.0', STANDALONE YES)
FROM
 customer c,
 fridge f,
 complaint p
WHERE
 p.fridgeid = f.id
 AND p.customerid = c.id
 AND f.id < 30;