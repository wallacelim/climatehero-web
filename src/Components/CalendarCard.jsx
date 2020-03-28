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

import ActivityHistory from "./ActivityHistory";
import { getDateAsString } from "../util/dateTime";

const CalendarCard = ({ style }) => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    return (
        <Card
            heading="Your Calendar"
            subtitle="Select a date range to view activities"
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
                    onChange={([startDate, endDate]) => {
                        setSelectedStartDate(getDateAsString(startDate));
                        setSelectedEndDate(getDateAsString(endDate));
                    }}
                    width="1000px"
                    selectRange
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
                    <ActivityHistory
                        dateRangeStart={selectedStartDate}
                        dateRangeEnd={selectedEndDate}
                    />
                </FlexBox>
            </FlexBox>
        </Card>
    );
};

export default connect()(CalendarCard);
