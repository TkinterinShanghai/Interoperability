declare variable $elements := doc("../foreign_xmls/1_data.xml")/appointments/appointment;

<AppointmentOverview>
    {for $element in $elements
    return 
    <appointment handled="{data($element/date)}" rating="3" id="{data($element/customer/@id)}">
        <complaint>
            <fridgeid>
                {data($element/parts_needed/part/@fridgeID)}
            </fridgeid>
            <isresolved>false</isresolved>
            <issuedate>{data($element/date)}
            </issuedate>
        </complaint>
        <employee>
            <adress>
                <adress country="KP" zip="76782">
                <street><name>Nader Cliffs</name>
                        <number>330</number></street>
                </adress>
            </adress>
            <id>{data($element/customer/@customerid)}</id>
        </employee>
    </appointment>}
</AppointmentOverview>