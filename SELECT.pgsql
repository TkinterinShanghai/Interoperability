SELECT
    XMLELEMENT(NAME
        user, XMLELEMENT(NAME
            account,
            XMLATTRIBUTES(
                password
            ), XMLFOREST(account_description AS "description", a.email, last_login AS "lastLogin")
        ), XMLELEMENT(NAME
            inventory, XMLFOREST(i.color, i.size, i.email)
        ), XMLELEMENT(NAME
            player, XMLFOREST(p.nickname)
        )
    )
FROM
    account     a,
    inventory   i,
    player      p
WHERE
    a.email LIKE i.email
    AND a.email LIKE p.email
Limit 30;


SELECT
    XMLELEMENT(NAME
        info, XMLELEMENT(NAME
            description, player_description, XMLELEMENT(NAME
                player_location, xmlattributes(l.geolocation), XMLELEMENT(NAME
                    account_description, XMLFOREST(a.email, a.account_description)
                ), XMLFOREST(l.flora, l.fauna, l.brightness)
            )
        )
    )
FROM
    account    a,
    player     p,
    location   l
WHERE
    p.geolocation = l.geolocation
    AND a.email = p.email;


SELECT
    XMLELEMENT(NAME
        materialusage, XMLELEMENT(NAME
            materialinfo, m.durability
        ), XMLELEMENT(NAME
            usedin, XMLFOREST(i.name, i.worth, i.usage), XMLELEMENT(NAME
                foundat, xmlattributes(l.geolocation),
                xmlelement(name details, xmlelement(name floraandfauna, xmlforest(l.fauna, l.flora)))
            )
        )
    )
FROM
    material   m,
    item       i,
    location   l
WHERE
    l.geolocation = i.geolocation
    AND m.name = i.material;

-- select xmlagg(i.name) from item i, location l where i.geolocation = l.geolocation


SELECT
    XMLELEMENT(NAME
        locationinfo, xmlattributes(l.geolocation), XMLELEMENT(NAME
            playerslocation, XMLAGG(player_description)
        ), XMLELEMENT(NAME
            averageitemworth, AVG(i.worth)
        )
    )
FROM
    player     p,
    location   l,
    item       i
WHERE
    l.geolocation = p.geolocation
    AND i.geolocation = l.geolocation
GROUP BY
    l.geolocation;