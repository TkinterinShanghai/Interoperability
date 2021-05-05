<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <UserList>
            <xsl:for-each select="characterdetails/account">
                <user>
                    <account password="defaultPassword">
                        <description>
                            <account>
                                <nickname>
                                    <xsl:value-of select="username" />
                                </nickname>
                                <email>
                                    <xsl:value-of select="email" />
                                </email>
                                <details>
                                    <gender>male</gender>
                                </details>
                            </account>
                        </description>
                        <email>
                            <xsl:value-of select="email" />
                        </email>
                        <lastLogin>
                            2021-04-15
                        </lastLogin>
                    </account>
                    <inventory>
                        <color>black</color>
                        <size>10</size>
                        <email>
                            <xsl:value-of select="email" />
                        </email>
                    </inventory>
                    <player>
                        <nickname><xsl:value-of select="character/@character_name" /></nickname>
                    </player>
                </user>
            </xsl:for-each>

        </UserList>

    </xsl:template>
</xsl:stylesheet>
