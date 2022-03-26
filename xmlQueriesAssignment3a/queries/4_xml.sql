
SELECT XMLROOT(XMLELEMENT(NAME
    "LocatedAtFacility", XMLAGG(XMLELEMENT(NAME
    "facility", xmlattributes(s.phone,s.email, s.active ), 
    XMLELEMENT(NAME "repairpart", XMLFOREST(r.material, r.price, r.remarks->>'meta' as remarks)), 
    XMLELEMENT(NAME "employee", XMLFOREST(e.id, e.email)
    ))
    )),
    VERSION '1.0', STANDALONE YES)
FROM
employee e,
servicefacility s,
repairpart r
WHERE
s.id = e.facilityid
AND s.id = r.facilityid
AND s.id < 30;
