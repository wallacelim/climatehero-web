import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
    Button,
    ButtonDesign,
    CalendarType,
    DatePicker,
    Dialog,
    FlexBox,
    FlexBoxAlignItems,
    FlexBoxDirection,
    FlexBoxJustifyContent,
    Input,
    InputType,
    Label,
    Option,
    Select,
    Text,
    ValueState,
} from "@ui5/webcomponents-react";
import {
    sapUiContentPadding,
    sapUiSmallMarginBottom,
    sapUiTinyMargin,
} from "@ui5/webcomponents-react-base/lib/spacing";

import TimePicker from "react-time-picker";
import {
    COMMUTE_BIKE,
    COMMUTE_BUS,
    COMMUTE_TRAIN,
    MEAL_VEGETARIAN,
} from "../constants/activityTypes";
import { Activity, UI } from "../redux/actionCreators";
import { getActivityTypeFromString } from "../util/activities";
import { DATE_FORMAT } from "../constants/stringFormats";

const EditActivityModal = ({
    activity,
    editActivityModal,
    userId,
    toggleEditActivityModal,
    editActivity,
    deleteActivity,
}) => {
    const [activityType, setActivityType] = React.useState();
    const [input, setInput] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState();

    useEffect(() => {
        if (activity) {
            setActivityType(activity.type);
            setInput(activity.measurement);
            setSelectedDate(activity.dateTimeOfActivity.split(" ")[0]);
            setSelectedTime(activity.dateTimeOfActivity.split(" ")[1]);
        }
    }, [activity, editActivityModal]);

    const handleEdit = () => {
        if (!input || input <= 0) {
            alert("please enter a positive value");
            return;
        }
        if (!selectedDate || !selectedTime) {
            throw new Error("No selected date/time");
        }
        const dateTimeOfActivity = `${selectedDate} ${selectedTime}`;
        toggleEditActivityModal();
        const updatedActivity = {
            userId,
            type: activityType,
            metric: activityType.metric,
            measurement: parseFloat(input).toFixed(2),
            dateTimeOfActivity,
        };
        editActivity(editActivityModal.id, activity, updatedActivity);
    };

    const handleDelete = () => {
        toggleEditActivityModal();
        deleteActivity(activity);
    };

    const handleSelectType = (e) => {
        const name = e.parameters.selectedOption.value;
        setActivityType(getActivityTypeFromString(name));
    };

    return (
        <Dialog
            style={sapUiContentPadding}
            header={[
                <FlexBox
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.SpaceBetween}
                    alignItems={FlexBoxAlignItems.Center}
                    style={sapUiContentPadding}
                >
                    <h5>Edit an Activity</h5>
                    <Button
                        design={ButtonDesign.Default}
                        onClick={toggleEditActivityModal}
                        style={sapUiTinyMargin}
                    >
                        Close
                    </Button>
                </FlexBox>,
            ]}
            stretch={false}
            open={editActivityModal.isOpen}
            footer={
                <div style={{ zIndex: 0 }}>
                    <FlexBox
                        justifyContent={FlexBoxJustifyContent.Center}
                        style={{ ...sapUiTinyMargin, zIndex: "0" }}
                    >
                        <Button
                            design={ButtonDesign.Emphasized}
                            onClick={handleEdit}
                            style={{ ...sapUiTinyMargin, zIndex: "0" }}
                        >
                            Save
                        </Button>
                        <Button
                            design={ButtonDesign.Reject}
                            onClick={handleDelete}
                            style={{ ...sapUiTinyMargin, zIndex: "0" }}
                        >
                            Delete
                        </Button>
                    </FlexBox>
                </div>
            }
        >
            <FlexBox
                style={{ ...sapUiContentPadding, width: "400px" }}
                direction={FlexBoxDirection.Column}
                justifyContent={FlexBoxJustifyContent.Center}
            >
                <Text style={sapUiContentPadding}>
                    {activityType ? activityType.infoText : ""}
                </Text>
                <Label>Type</Label>
                <Select
                    style={sapUiSmallMarginBottom}
                    onChange={handleSelectType}
                >
                    <Option icon="supplier" value={COMMUTE_BIKE.name}>
                        {COMMUTE_BIKE.displayName} ({COMMUTE_BIKE.metric})
                    </Option>
                    <Option
                        icon="bus-public-transport"
                        value={COMMUTE_BUS.name}
                    >
                        {COMMUTE_BUS.displayName} ({COMMUTE_BUS.metric})
                    </Option>
                    <Option icon="passenger-train" value={COMMUTE_TRAIN.name}>
                        {COMMUTE_TRAIN.displayName} ({COMMUTE_TRAIN.metric})
                    </Option>
                    <Option icon="meal" value={MEAL_VEGETARIAN.name}>
                        {MEAL_VEGETARIAN.displayName} ({MEAL_VEGETARIAN.metric})
                    </Option>
                </Select>
                <Label>{activityType ? activityType.metric : ""}</Label>
                <Input
                    type={InputType.Number}
                    value={input}
                    onChange={(e) => setInput(e.parameters.value)}
                    style={sapUiSmallMarginBottom}
                />
                <Label>Date</Label>
                <DatePicker
                    valueState={ValueState.None}
                    formatPattern={DATE_FORMAT}
                    primaryCalendarType={CalendarType.Gregorian}
                    disabled={false}
                    readonly={false}
                    onChange={(date) => setSelectedDate(date.parameters.value)}
                    value={selectedDate}
                    style={sapUiSmallMarginBottom}
                />
                <Label>Time</Label>
                <TimePicker
                    required
                    disableClock
                    clearIcon={null}
                    format="H:m"
                    onChange={(time) => {
                        if (time) {
                            setSelectedTime(`${time}:00`);
                        }
                    }}
                    style={{ sapUiContentPadding }}
                    hourPlaceholder={
                        selectedTime ? selectedTime.substring(0, 2) : ""
                    }
                    minutePlaceholder={
                        selectedTime ? selectedTime.substring(3, 5) : ""
                    }
                />
            </FlexBox>
        </Dialog>
    );
};

const mapStateToProps = ({ activities, user, editActivityModal }) => ({
    editActivityModal,
    userId: user.data.id,
    activity: activities.data.find((activity) => {
        if (activity.id === editActivityModal.id) {
            return true;
        }
        return false;
    }),
});

const mapDispatchToProps = (dispatch) => ({
    toggleEditActivityModal: (activityId) =>
        dispatch(UI.toggleEditActivityModal(activityId)),
    editActivity: (activityId, prev, next) =>
        dispatch(Activity.edit(activityId, prev, next)),
    deleteActivity: (activity) => dispatch(Activity.delete(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditActivityModal);
