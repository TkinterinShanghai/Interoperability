let $accounts := (doc("result2.xml")/characterdetails/account)
return 
<PlayerList>
{for $account in $accounts
    return 
    <info>
        <description>
            <player>
                <nickname>
                    {data($account/character/@character_name)}
                </nickname>
                {$account/email}
                <details>
                    <skills>&#123; "someskill" : somevalue  &#125;</skills>
                </details>
            </player>
            <player_location geolocation="(0,1)">
                <account_description>
                    {$account/email}
                    <account_description>
                        <account>
                            <nickname>
                                {data($account/character/@character_name)}
                            </nickname>
                            {$account/email}
                            <details>
                                <gender>male</gender>
                            </details>
                        </account>
                    </account_description>
                </account_description>
                <flora>friendly</flora>
                <fauna>mediterranean</fauna>
                <brightness>200</brightness>
            </player_location>
        </description>
    </info>
}
</PlayerList>