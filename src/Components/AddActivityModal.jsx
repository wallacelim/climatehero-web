import React, { useState } from "react";
import { connect } from "react-redux";
// import "@ui5/webcomponents-icons/dist/icons/meal";
// import "@ui5/webcomponents-icons/dist/icons/passenger-train";
// import "@ui5/webcomponents-icons/dist/icons/physical-activity";
// import "@ui5/webcomponents-icons/dist/icons/bus-public-transport";
// import "@ui5/webcomponents-icons/dist/icons/supplier";

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
import {
    getCurrentDateTimeString,
    getCurrentDateString,
    getCurrentTimeString,
} from "../util/datetime";
import { getActivityTypeFromString } from "../util/activities";
import { DATE_FORMAT } from "../constants/stringFormats";

const AddActivityModal = ({
    addActivityModal,
    userId,
    toggleAddActivityModal,
    addActivity,
}) => {
    const [activityType, setActivityType] = React.useState(COMMUTE_BIKE);
    const [input, setInput] = useState(0);
    const [selectedDate, setSelectedDate] = useState(getCurrentDateString);
    const [selectedTime, setSelectedTime] = useState(getCurrentTimeString);

    // TODO: reset fields after every add

    const handleAdd = () => {
        if (!input || input <= 0) {
            alert("please enter a positive value");
            return;
        }
        let dateTimeOfActivity = getCurrentDateTimeString();
        if (selectedDate && selectedTime) {
            dateTimeOfActivity = `${selectedDate} ${selectedTime}`;
        }
        toggleAddActivityModal();
        const activity = {
            userId,
            type: activityType,
            metric: activityType.metric,
            measurement: parseInt(input, 10),
            reductionValue: (Math.random() * 10).toFixed(2),
            dateTimeOfActivity,
        };
        addActivity(activity);
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
                    <h5>Add Your Activity</h5>
                    <Button
                        design={ButtonDesign.Reject}
                        onClick={toggleAddActivityModal}
                        style={sapUiTinyMargin}
                    >
                        Close
                    </Button>
                </FlexBox>,
            ]}
            stretch={false}
            open={addActivityModal.isOpen}
            footer={
                <div style={{ zIndex: 0 }}>
                    <FlexBox
                        justifyContent={FlexBoxJustifyContent.Center}
                        style={{ ...sapUiTinyMargin, zIndex: "0" }}
                    >
                        <Button
                            design={ButtonDesign.Emphasized}
                            onClick={handleAdd}
                            style={{ ...sapUiTinyMargin, zIndex: "0" }}
                        >
                            Add
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
                <Text style={sapUiContentPadding}>{activityType.infoText}</Text>
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
                <Label>{activityType.metric}</Label>
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
                    placeholder={selectedDate}
                    style={sapUiSmallMarginBottom}
                />
                <Label>Time</Label>
                <TimePicker
                    required
                    disableClock
                    clearIcon={null}
                    format="HH:mm"
                    onChange={(time) => {
                        if (time) {
                            setSelectedTime(`${time}:00`);
                        }
                    }}
                    style={{ sapUiContentPadding }}
                    hourPlaceholder={selectedTime.substring(0, 2)}
                    minutePlaceholder={selectedTime.substring(3, 5)}
                />
            </FlexBox>
        </Dialog>
    );
};
const mapStateToProps = ({ user, addActivityModal }) => ({
    addActivityModal,
    userId: user.data.id,
});

const mapDispatchToProps = (dispatch) => ({
    toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal()),
    addActivity: (activity) => dispatch(Activity.add(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddActivityModal);
