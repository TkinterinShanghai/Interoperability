<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <ComplaintOverview>
            <xsl:for-each select="tickets/ticket">
                <complaint>
                    <xsl:attribute name="id">
                        <xsl:value-of select="@ticketid" />
                    </xsl:attribute>
                    <xsl:attribute name="issuedate">2021-12-06</xsl:attribute>
                    <xsl:attribute name="isresolved">false</xsl:attribute>
                    <customer>

                        <email>
                            <xsl:value-of select="customer/email" />
                        </email>
                        <lastactive>2021-08-20</lastactive>
                        <adress>
                            <adress country="KP" zip="76782">
                                <street>
                                    <name>Nader Cliffs</name>
                                    <number>330</number>
                                </street>
                            </adress>
                        </adress>
                    </customer>
                    <fridge>
                        <fridge_type>
                            <xsl:value-of select="description/customer_section/fridgeid" />
                        </fridge_type>
                        <price>702</price>
                    </fridge>
                </complaint>
            </xsl:for-each>

        </ComplaintOverview>

    </xsl:template>
</xsl:stylesheet>