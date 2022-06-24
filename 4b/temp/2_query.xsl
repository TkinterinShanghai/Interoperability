<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <LocatedAtFacility>
            <xsl:for-each select="result/fridge">
                <facility>
                    <xsl:call-template name="attributes"/>
                    <repairpart>
                        <material>
                            <xsl:value-of select="part/name" />
                        </material>
                        <price>
                            <xsl:value-of select="part/price" />
                        </price>
                        <remarks>&#123;"importance":3&#125;</remarks>
                    </repairpart>
                    <employee>
                        <email>sampleemail@sample.com</email>
                        <id>
                            <xsl:value-of select="part/facility/@facilityid" />
                        </id>
                        <xsl:apply-templates select="email"/>
                    </employee>
                </facility>
            </xsl:for-each>

        </LocatedAtFacility>

    </xsl:template>

    <xsl:template name="attributes">
        <xsl:attribute name="phone">435235235335</xsl:attribute>
        <xsl:attribute name="email">sampleemail@sample.com</xsl:attribute>
        <xsl:attribute name="active">true</xsl:attribute>
    </xsl:template>

    <xsl:template match="email">
        <xsl:element name="email">sampleemail@sample.com</xsl:element>
    </xsl:template>

</xsl:stylesheet>