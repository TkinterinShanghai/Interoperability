<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <AppointmentOverview>
            <xsl:for-each select="appointments/appointment">
                <appointment>
                    <xsl:attribute name="handled">
                        <xsl:value-of select="date" />
                    </xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="customer/@customerid" />
                    </xsl:attribute>
                    <xsl:attribute name="rating">3</xsl:attribute>
                    <complaint>
                        <fridgeid>
                            <xsl:value-of select="parts_needed/part/@fridgeID" />
                        </fridgeid>
                        <isresolved>false</isresolved>
                        <issuedate>
                            <xsl:value-of select="date" />
                        </issuedate>
                    </complaint>
                    <employee>
                        <adress>
                            <adress country="KP" zip="76782">
                                <street>
                                    <name>Nader Cliffs</name>
                                    <number>330</number>
                                </street>
                            </adress>
                        </adress>
                        <id>
                            <xsl:value-of select="customer/@customerid" />
                        </id>
                    </employee>
                </appointment>
            </xsl:for-each>

        </AppointmentOverview>

    </xsl:template>
</xsl:stylesheet>