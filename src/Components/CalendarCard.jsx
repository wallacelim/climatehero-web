import React, { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    Card,
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxAlignItems
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { Icon } from "@ui5/webcomponents-react/lib/Icon";

import "@ui5/webcomponents-icons/dist/icons/appointment-2.js";

export default function CalendarCard() {
    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate);

    return (
        <Card
            heading="Your Calendar"
            subtitle="Select a date to edit activities"
            style={{
                ...spacing.sapUiContentPadding
            }}
            avatar={<Icon name="appointment-2" />}
        >
            <FlexBox
                justifyContent={FlexBoxJustifyContent.Start}
                alignItems={FlexBoxAlignItems.Center}
            >
                <Calendar
                    onChange={date =>
                        setSelectedDate(moment(date).format("YYYY-MM-DD"))
                    }
                    style={{ width: "1000px" }}
                />
                {/* <Card
                    style={{ ...spacing.sapUiContentPadding, height: "100%" }}
                > */}
                <FlexBox
                    justifyContent={FlexBoxJustifyContent.Center}
                    alignItems={FlexBoxAlignItems.Center}
                    style={{
                        ...spacing.sapUiContentPadding,
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <p>Select a date to edit</p>
                </FlexBox>
                {/* </Card> */}
            </FlexBox>
        </Card>
    );
}
