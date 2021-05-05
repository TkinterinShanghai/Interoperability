let $accounts := (doc("result2.xml")/characterdetails/account)
return 
<LocationList>
{for $account in $accounts
    return 
    <locationinfo geolocation="(0,1)">
        <playerslocation />
        <player>
            <nickname>{data($account/character/@character_name)}</nickname>
            {$account/email}
            <details>
                <skills>&#123; "someskill" : "somevalue"  &#125;</skills>
            </details>
        </player>
    </locationinfo>
}
</LocationList>