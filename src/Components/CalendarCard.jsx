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
} from "@ui5/webcomponents-react";
import { Icon } from "@ui5/webcomponents-react/lib/Icon";
import "@ui5/webcomponents-icons/dist/icons/appointment-2";
import { UI } from "../redux/actionCreators";
import { getDateAsString } from "../util/dateTime";

const CalendarCard = ({ style, toggleAddActivityModal }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <Button
        icon="add-activity"
        onClick={toggleAddActivityModal}
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
        // subtitle="Select a date to edit activities"
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
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal())
});

export default connect(null, mapDispatchToProps)(CalendarCard);
