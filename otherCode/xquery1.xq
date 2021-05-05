let $accounts := (doc("result2.xml")/characterdetails/account)
return 
<UserList>
{for $account in $accounts
return <user>
    <account password="defaultPassword">
        <description>
            <account>
                <nickname>
                    {data($account/username)}
                </nickname>
                {$account/email}
                <details>
                    <gender>male</gender>
                </details>
            </account>
        </description>
        {$account/email}
        <lastLogin>
        2021-04-15
        </lastLogin>
    </account>
    <inventory>
        <color>black</color>
        <size>10</size>
        {$account/email}
    </inventory>
    <player>
        <nickname>{data($account/character/@character_name)}</nickname>
    </player>
</user>}
</UserList>
