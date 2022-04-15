declare variable $elements := doc("../foreign_xmls/4_data.xml")/facility_ratings/ticket;

<CustomerComplaintAppointment>
    {for $element in $elements
    return 
        <appointment handled="2021-12-31" rating="{data($element/facility/rating)}">
        <complaint>
            <id>{data($element/@ticketid)}</id>
            <isresolved>{data($element/status) = "closed"}</isresolved>
            <issuedate>{data($element/last_edited)}</issuedate>
        </complaint>
        <customer importance="3">
            <remarkstext>{data($element/solution)}</remarkstext>
        </customer>
    </appointment>}
</CustomerComplaintAppointment>