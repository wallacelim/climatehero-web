/* eslint-disable indent */
import React, { useState } from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Button,
  ButtonDesign,
  Card,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
} from "@ui5/webcomponents-react";
import { Icon } from "@ui5/webcomponents-react/lib/Icon";
import "@ui5/webcomponents-icons/dist/icons/appointment-2";
import "@ui5/webcomponents-icons/dist/icons/appointment";

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
      <Button
        icon="add-activity"
        onClick={toggleAddActivityModal}
        design={ButtonDesign.Emphasized}
        style={{
          float: "right",
          padding: "5px 10px",
          marginRight: "15px"
        }}
      >
        Add an activity
      </Button>
      <Card
        heading="Your Calendar"
        subtitle="Select a date range to view activities"
        style={{
          ...style
        }}
        avatar={<Icon name="appointment-2" />}
      >
        <FlexBox
          justifyContent={FlexBoxJustifyContent.End}
          alignItems={FlexBoxAlignItems.Center}
          style={{ ...style, position: "relative", marginTop: "-9vh" }}
        >
          <Button onClick={resetCalendar} style={{ margin: "-30px 20px -20px" }}>
            Reset Calendar
          </Button>
        </FlexBox>
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Start}
          alignItems={FlexBoxAlignItems.Center}
          style={{ ...style }}
        >
          <Calendar
            calendarType="ISO 8601"
            selectRange
            onChange={([startDate, endDate]) => {
              setSelectedStartDate(getDateAsString(startDate));
              setSelectedEndDate(getDateAsString(endDate));
            }}
            width="1000px"
            value={
              selectedEndDate && selectedEndDate
                ? [
                    getDateFromString(selectedStartDate).toDate(),
                    getDateFromString(selectedEndDate).toDate()
                  ]
                : null
            }
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
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal())
});

export default connect(null, mapDispatchToProps)(CalendarCard);
