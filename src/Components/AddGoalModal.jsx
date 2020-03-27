import React, { useState } from "react";
import { connect } from "react-redux";
import {
    Dialog,
    Select,
    Input,
    Option,
    Button,
    FlexBox,
    ButtonDesign,
    InputType,
    Label,
    FlexBoxDirection,
    FlexBoxJustifyContent,
    FlexBoxAlignItems,
    ValueState,
    CalendarType
} from "@ui5/webcomponents-react";
import { DatePicker } from "@ui5/webcomponents-react/lib/DatePicker";
import {
    sapUiContentPadding,
    sapUiTinyMargin,
    sapUiSmallMarginBottom
} from "@ui5/webcomponents-react-base/lib/spacing";
import {
    WALKING,
    BUS_RIDE,
    TRAIN_RIDE,
    BIKE_RIDE,
    VEGETARIAN_MEAL
} from "../constants/activityTypes";
import { Goal, UI } from "../redux/actionCreators";
import "@ui5/webcomponents-icons/dist/icons/meal";
import "@ui5/webcomponents-icons/dist/icons/passenger-train";
import "@ui5/webcomponents-icons/dist/icons/physical-activity";
import "@ui5/webcomponents-icons/dist/icons/bus-public-transport";
import "@ui5/webcomponents-icons/dist/icons/supplier";
import { getCurrentDateString } from "../util/dateTime";
import { getActivityTypeFromString } from "../util/activities";
import { DATE_FORMAT } from "../constants/stringFormats";

const AddGoalModal = ({ addGoalModal, toggleAddGoalModal, addGoal }) => {
    const [name, setName] = useState("");
    const [target, setTarget] = useState(0);
    const [activityType, setActivityType] = useState(WALKING);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleAdd = () => {
        if (!name) {
            alert("Please enter a goal name");
            return;
        }
        if (!target) {
            alert("Please enter a non-zero value");
            return;
        }
        if (!selectedDate) {
            alert("Please select a valid date");
            return;
        }
        toggleAddGoalModal();

        const goal = {
            name,
            startDate: getCurrentDateString(),
            targetDate: selectedDate,
            type: activityType,
            currentMeasurement: 0,
            targetMeasurement: parseInt(target, 10),
            metric: activityType.metric,
            progress: 0
        };
        addGoal(goal);
    };

    const handleSelectType = e => {
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
                    <h5>Add a Goal</h5>
                    <Button
                        design={ButtonDesign.Reject}
                        onClick={toggleAddGoalModal}
                        style={sapUiTinyMargin}
                    >
                        Close
                    </Button>
                </FlexBox>
            ]}
            stretch={false}
            open={addGoalModal.isOpen}
            footer={(
                <div>
                    <FlexBox
                        justifyContent={FlexBoxJustifyContent.Center}
                        style={sapUiTinyMargin}
                    >
                        <Button
                            design={ButtonDesign.Emphasized}
                            onClick={handleAdd}
                            style={sapUiTinyMargin}
                        >
                            Add
                        </Button>
                    </FlexBox>
                </div>
            )}
        >
            <section>
                <FlexBox
                    style={{ ...sapUiContentPadding, width: "400px" }}
                    direction={FlexBoxDirection.Column}
                    justfyContent={FlexBoxJustifyContent.Center}
                >
                    <Label>Name</Label>
                    <Input
                        type={InputType.Text}
                        onChange={e => setName(e.parameters.value)}
                        style={sapUiSmallMarginBottom}
                        placeholder="e.g. Travel by bus"
                    />
                    <Label>Type</Label>
                    <Select
                        style={sapUiSmallMarginBottom}
                        onChange={handleSelectType}
                    >
                        <Option icon="physical-activity" value={WALKING.name}>
                            {WALKING.displayName}
                            {" "}
                            (
                            {WALKING.metric}
                            )
                        </Option>
                        <Option icon="supplier" value={BIKE_RIDE.name}>
                            {BIKE_RIDE.displayName}
                            {" "}
                            (
                            {BIKE_RIDE.metric}
                            )
                        </Option>
                        <Option
                            icon="bus-public-transport"
                            value={BUS_RIDE.name}
                        >
                            {BUS_RIDE.displayName}
                            {" "}
                            (
                            {BUS_RIDE.metric}
                            )
                        </Option>
                        <Option icon="passenger-train" value={TRAIN_RIDE.name}>
                            {TRAIN_RIDE.displayName}
                            {" "}
                            (
                            {TRAIN_RIDE.metric}
                            )
                        </Option>
                        <Option icon="meal" value={VEGETARIAN_MEAL.name}>
                            {VEGETARIAN_MEAL.displayName}
                            {" "}
                            (
                            {VEGETARIAN_MEAL.metric}
                            )
                        </Option>
                    </Select>
                    <Label>
                        Target (
                        {activityType.metric}
                        )
                    </Label>
                    <Input
                        type={InputType.Number}
                        onChange={e => setTarget(e.parameters.value)}
                        style={sapUiSmallMarginBottom}
                        placeholder="e.g. 100"
                    />
                    <Label>Target Date of Completion</Label>
                    <DatePicker
                        valueState={ValueState.None}
                        formatPattern={DATE_FORMAT}
                        primaryCalendarType={CalendarType.Gregorian}
                        disabled={false}
                        readonly={false}
                        onChange={date =>
                            setSelectedDate(date.parameters.value)}
                        placeholder={selectedDate}
                    />
                </FlexBox>
            </section>
        </Dialog>
    );
};

const mapStateToProps = ({ addGoalModal }) => ({ addGoalModal });

const mapDispatchToProps = dispatch => ({
    toggleAddGoalModal: () => dispatch(UI.toggleAddGoalModal()),
    addGoal: goal => dispatch(Goal.add(goal))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGoalModal);
