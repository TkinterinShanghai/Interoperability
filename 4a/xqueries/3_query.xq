declare variable $elements := doc("../foreign_xmls/3_data.xml")/tickets/ticket;

<ComplaintOverview>
    {for $element in $elements
    return 
        <complaint id="{data($element/@ticketid)}" isresolved="false" issuedate="2021-12-06">
        <customer>
            <email>{data($element/customer/email)}</email>
            <lastactive>2021-08-20</lastactive>
            <adress>
                <adress zip="51207" country="MC">
                    <street>
                        <name>Nella Hill</name>
                        <number>500</number>
                    </street>
                </adress>
            </adress>
        </customer>
        <fridge>
            <fridge_type>{data($element/description/customer_section/fridgeid)}</fridge_type>
            <price>702</price>
        </fridge>
    </complaint>}
</ComplaintOverview>