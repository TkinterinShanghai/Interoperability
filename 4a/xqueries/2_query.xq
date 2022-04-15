declare variable $fridges := doc("../foreign_xmls/2_data.xml")/result/fridge;

declare variable $tickets := doc("../foreign_xmls/4_data.xml")/facility_ratings/ticket;

<LocatedAtFacility>
    {for $fridge in $fridges
    for $ticket in $tickets
    where $ticket/facility/@facilityid=$fridge/part/facility/@facilityid
    return 
    <facility phone="{data($ticket/facility/communication/department/phone)}" email="{data($ticket/facility/communication/department/email)}" active="true">
        <repairpart>
            <material>{data($fridge/part/name)}</material>
            <price>{data($fridge/part/price)}</price>
            <remarks>&#123;"importance":3&#125;</remarks>
        </repairpart>
        <employee>
            <id>{data($fridge/part/facility/@facilityid)}</id>
            <email>{data($ticket/facility/communication/department/email)}</email>
        </employee>
    </facility>
    }
</LocatedAtFacility>