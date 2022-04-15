Hier hab ich aufgehört




<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <LocatedAtFacility>
            <xsl:for-each select="appointments/appointment">
            <facility>
                <xsl:attribute name="phone">
                        <xsl:value-of select="facility/communication/department/phone" />
                <xsl:attribute name="active">true</xsl:attribute>
                <xsl:attribute name="email">
                        <xsl:value-of select="facility/communication/department/email" />
                    </xsl:attribute>
                <repairpart>
                    <material>{data($fridge/part/name)}<xsl:value-of select="parts_needed/part/@fridgeID" /></material>
                    <price>{data($fridge/part/price)}</price>
                    <remarks>&#123;"importance":3&#125;</remarks>
                </repairpart>
                <employee>
                    <id>{data($fridge/part/facility/@facilityid)}</id>
                    <email>{data($ticket/facility/communication/department/email)}</email>
                </employee>
            </facility>
            </xsl:for-each>

        </LocatedAtFacility>

    </xsl:template>
</xsl:stylesheet>