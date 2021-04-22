CREATE DATABASE interoperability;

CREATE TYPE geolocationtype as (longitute int, latitude int);
CREATE TYPE gendertype as enum ('male', 'female');

create table account (
    email varchar(200) primary key,
    player_age smallint not null,
    last_login date,
    signup_date date not null,
    account_description xml,
    password text,
    username text
);

create table location (
    geolocation geolocationtype primary key,
    fauna varchar(400),
    flora varchar(400),
    climate varchar(200),
    brightness smallint,
    culture varchar(200)
);

create table player (
    email varchar(200),
    nickname varchar(50),
    level_of smallint not null default 1,
    player_description xml,
    haircolor varchar(20) not null,
    age smallint not null,
    stats jsonb,
    gender gendertype not null,
    geolocation geolocationtype not null,
    primary key(email, nickname),
    foreign key(email) references account,
    foreign key(geolocation) references location
);

create table inventory (
    player_nickname varchar(50) not null,
    inventory_name varchar(50) not null,
    email varchar(200) not null,
    size smallint not null, 
    color varchar(50) not null,
    robustness smallint not null,
    inventory_description xml,
    content jsonb,
    primary key(player_nickname, inventory_name, email),
    foreign key(player_nickname, email) references player (nickname, email)
);

create table weapon (
    name varchar(50) primary key,
    defense smallint not null,
    radius smallint not null,
    damage smallint not null,
    range_to smallint not null,
    weight smallint not null
);

create table material (
    name varchar(50) primary key,
    worth float(2),
    smell varchar(50),
    durability float(2),
    flexibility float(2),
    color varchar(50)
);

create table item (
    name varchar(50) primary key,
    type varchar(50) not null,
    geolocation geolocationtype not null,
    material varchar(50) not null,
    worth float(2) not null,
    size smallint not null,
    usage varchar(200) not null,
    foreign key (material) references material,
    foreign key(geolocation) references location
);

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
    AND a.email LIKE p.email;


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