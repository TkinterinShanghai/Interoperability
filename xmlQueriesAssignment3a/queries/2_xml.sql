SELECT XMLROOT(XMLELEMENT(NAME
    "AppointmentOverview", XMLAGG(XMLELEMENT(NAME
    "appointment", xmlattributes(a.handled,a.rating, a.id ), 
    XMLELEMENT(NAME "complaint", XMLFOREST(c.fridgeid, c.isresolved, c.issueDate)), 
    XMLELEMENT(NAME "employee", XMLFOREST(e.adress, e.id))
    ))
    ),
    VERSION '1.0', STANDALONE YES)
FROM
appointment a,
employee e,
complaint c
WHERE
a.employeeid = e.id
AND a.complaintid = c.id
AND a.id < 30;