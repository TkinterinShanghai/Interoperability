<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <CustomerComplaintAppointment>
            <xsl:for-each select="facility_ratings/ticket">
                <appointment>
                    <xsl:attribute name="handled">2021-12-31</xsl:attribute>
                    <xsl:attribute name="rating">
                        <xsl:value-of select="facility/rating" />
                    </xsl:attribute>
                    <complaint>
                        <id>
                            <xsl:value-of select="@ticketid"/>
                        </id>
                        <isresolved>
                            <xsl:choose>
                            <xsl:when test="status = 'closed'">true</xsl:when>  
                    </xsl:choose>
                        </isresolved>
                        <issuedate>
                            <xsl:value-of select="last_edited"/>
                        </issuedate>
                    </complaint>
                    <customer importance="3">
                        <remarkstext>
                            <xsl:value-of select="solution"/>
                        </remarkstext>
                    </customer>
                </appointment>
            </xsl:for-each>

        </CustomerComplaintAppointment>

    </xsl:template>
</xsl:stylesheet>