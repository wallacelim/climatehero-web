import React from "react";
import { Card } from "@ui5/webcomponents-react";
import { Calendar } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { Icon } from "@ui5/webcomponents-react/lib/Icon";

export default function CalendarCard() {
    return (
        <Card
            heading="Your Calendar"
            subtitle="Select a date to edit activities"
            style={spacing.sapUiContentPadding}
            avatar={<Icon name="appointment-2" />}
        >
            <Calendar />
        </Card>
    );
}
