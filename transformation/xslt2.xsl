<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <PlayerList>
            <xsl:for-each select="characterdetails/account">
                <info>
                    <description>
                        <player>
                            <nickname>
                                <xsl:value-of select="character/@character_name" />
                            </nickname>
                            <email>
                                <xsl:value-of select="email" />
                            </email>
                            <details>
                                <skills>{"someskill": somevalue}</skills>
                            </details>
                        </player>
                        <player_location geolocation="(0,1)">
                            <account_description>
                                <email>
                                    <xsl:value-of select="email" />
                                </email>
                                <account_description>
                                    <account>
                                        <nickname>
                                            <xsl:value-of select="character/@character_name" />
                                        </nickname>
                                        <email>
                                            <xsl:value-of select="email" />
                                        </email>
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
            </xsl:for-each>

        </PlayerList>

    </xsl:template>
</xsl:stylesheet>