let $accounts := (doc("result2.xml")/characterdetails/account)
return 
<MaterialList>
{for $account in $accounts
    return 
    <materialusage>
        <materialinfo>-0.5</materialinfo>
        <usedin>
            <name>item0</name>
            <worth>0</worth>
            <usage>cooking</usage>
            <foundat geolocation="(0,1)">
                <details>
                    <floraandfauna>
                        <fauna>mediterranean</fauna>
                        <flora>friendly</flora>
                    </floraandfauna>
                </details>
            </foundat>
        </usedin>
    </materialusage>
}
</MaterialList>