/* eslint-disable indent */
import React, { useState } from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    Button,
    Card,
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxAlignItems,
    ButtonDesign,
} from "@ui5/webcomponents-react";
import { Icon } from "@ui5/webcomponents-react/lib/Icon";
import "@ui5/webcomponents-icons/dist/icons/appointment-2";
import "@ui5/webcomponents-icons/dist/icons/appointment";

import { sapUiContentPadding } from "@ui5/webcomponents-react-base/lib/spacing";
import ActivityHistory from "./ActivityHistory";
import { UI } from "../redux/actionCreators";
import { getDateAsString, getDateFromString } from "../util/datetime";

const CalendarCard = ({ style, toggleAddActivityModal }) => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const resetCalendar = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
    };

    return (
        <>
            <FlexBox
                justifyContent={FlexBoxJustifyContent.SpaceBetween}
                style={{
                    ...style,
                }}
            >
                <Button
                    onClick={resetCalendar}
                    icon="appointment"
                    disabled={!selectedStartDate || !selectedEndDate}
                >
                    Reset Calendar
                </Button>
                <Button
                    design={ButtonDesign.Emphasized}
                    icon="add-activity"
                    onClick={toggleAddActivityModal}
                >
                    Add an activity
                </Button>
            </FlexBox>
            <Card
                heading="Your Calendar"
                subtitle="Select a date range to view activities"
                style={{
                    ...style,
                }}
                avatar={<Icon name="appointment-2" />}
            >
                <FlexBox
                    justifyContent={FlexBoxJustifyContent.Start}
                    alignItems={FlexBoxAlignItems.Center}
                    style={{ ...sapUiContentPadding, ...style }}
                >
                    <Calendar
                        calendarType="ISO 8601"
                        selectRange
                        onChange={([startDate, endDate]) => {
                            setSelectedStartDate(getDateAsString(startDate));
                            setSelectedEndDate(getDateAsString(endDate));
                        }}
                        value={
                            selectedEndDate && selectedEndDate
                                ? [
                                      getDateFromString(
                                          selectedStartDate
                                      ).toDate(),
                                      getDateFromString(
                                          selectedEndDate
                                      ).toDate(),
                                  ]
                                : null
                        }
                    />
                    <ActivityHistory
                        dateRangeStart={selectedStartDate}
                        dateRangeEnd={selectedEndDate}
                    />
                </FlexBox>
            </Card>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal()),
});

export default connect(null, mapDispatchToProps)(CalendarCard);
