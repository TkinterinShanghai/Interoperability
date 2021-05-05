<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <LocationList>
            <xsl:for-each select="characterdetails/account">
            <locationinfo geolocation="(0,1)">
                <playerslocation />
                <player>
                    <nickname><xsl:value-of select="character/@character_name" /></nickname>
                    <email><xsl:value-of select="email" /></email>
                    <details>
                        <skills>{"someskill": "somevalue"}</skills>
                    </details>
                </player>
            </locationinfo>
            </xsl:for-each>

        </LocationList>

    </xsl:template>
</xsl:stylesheet>