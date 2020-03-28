import React, { useState } from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    Card,
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxAlignItems
} from "@ui5/webcomponents-react";
import { Icon } from "@ui5/webcomponents-react/lib/Icon";
import "@ui5/webcomponents-icons/dist/icons/appointment-2";

import { getDateAsString } from "../util/dateTime";

const CalendarCard = ({ style }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <Card
            heading="Your Calendar"
            subtitle="Select a date to edit activities"
            style={{
                ...style
            }}
            avatar={<Icon name="appointment-2" />}
        >
            <FlexBox
                justifyContent={FlexBoxJustifyContent.Start}
                alignItems={FlexBoxAlignItems.Center}
                style={{ ...style }}
            >
                <Calendar
                    calendarType="ISO 8601"
                    onChange={date => setSelectedDate(getDateAsString(date))}
                    width="1000px"
                />
                <FlexBox
                    justifyContent={FlexBoxJustifyContent.Center}
                    alignItems={FlexBoxAlignItems.Center}
                    style={{
                        ...style,
                        width: "100%",
                        height: "100%"
                    }}
                >
                    {selectedDate ? (
                        <h5>Some information for the date: {selectedDate}</h5>
                    ) : (
                        <p>Select a date to edit</p>
                    )}
                </FlexBox>
            </FlexBox>
        </Card>
    );
};

export default connect()(CalendarCard);
