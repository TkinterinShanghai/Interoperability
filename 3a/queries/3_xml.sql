
SELECT XMLROOT(XMLELEMENT(NAME
    "CustomerComplaintAppointment", XMLAGG(XMLELEMENT(NAME
    "appointment", xmlattributes(a.handled,a.rating ), 
    XMLELEMENT(NAME "complaint", XMLFOREST(c.id, c.isresolved, c.issueDate)), 
    XMLELEMENT(NAME "customer", xmlattributes(u.remarks->'meta'->'importance' as importance), XMLELEMENT(NAME "remarkstext", u.remarks->'text')
    ))
    )),
    VERSION '1.0', STANDALONE YES)
FROM
appointment a,
customer u,
complaint c
WHERE
c.customerid = u.id
AND c.id = a.complaintid
AND a.id < 30;