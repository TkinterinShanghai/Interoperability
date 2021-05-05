<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <MaterialList>
            <xsl:for-each select="characterdetails/account">
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
            </xsl:for-each>

        </MaterialList>

    </xsl:template>
</xsl:stylesheet>