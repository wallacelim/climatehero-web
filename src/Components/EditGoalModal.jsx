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
    FlexBoxDirection,
    FlexBoxJustifyContent,
    FlexBoxAlignItems,
    ValueState,
    CalendarType,
    Label,
} from "@ui5/webcomponents-react";
import { DatePicker } from "@ui5/webcomponents-react/lib/DatePicker";
import {
    sapUiContentPadding,
    sapUiTinyMargin,
    sapUiSmallMarginBottom,
} from "@ui5/webcomponents-react-base/lib/spacing";
import {
    WALKING,
    BUS_RIDE,
    TRAIN_RIDE,
    BIKE_RIDE,
    VEGETARIAN_MEAL,
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

const EditGoalModal = ({
    goal, editGoalModal, toggleEditGoalModal, editGoal,
}) => {
    const initialState = {
        name: null,
        targetMeasurement: null,
        type: null,
        targetDate: null,
        ...goal,
    };
    console.log(initialState);
    const [name, setName] = useState(initialState.name);
    const [target, setTarget] = useState(initialState.target);
    const [activityType, setActivityType] = useState(initialState.type);
    const [selectedDate, setSelectedDate] = useState(initialState.targetDate);
    console.log(`name is ${name}`);

    const handleEdit = () => {
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
        toggleEditGoalModal(goal.id);

        const updates = {
            name,
            startDate: getCurrentDateString(),
            targetDate: selectedDate,
            type: activityType,
            currentMeasurement: goal.currentMeasurement,
            targetMeasurement: parseInt(target, 10),
            metric: activityType.metric,
        };
        editGoal(goal.id, updates);
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
                    <h5>Edit Goal</h5>
                    <Button
                        design={ButtonDesign.Reject}
                        onClick={() => toggleEditGoalModal(goal.id)}
                        style={sapUiTinyMargin}
                    >
                        Close
                    </Button>
                </FlexBox>,
            ]}
            stretch={false}
            open={editGoalModal.isOpen}
            footer={
                <div>
                    <FlexBox
                        justifyContent={FlexBoxJustifyContent.Center}
                        style={sapUiTinyMargin}
                    >
                        <Button
                            design={ButtonDesign.Emphasized}
                            onClick={handleEdit}
                            style={sapUiTinyMargin}
                        >
                            Save
                        </Button>
                    </FlexBox>
                </div>
            }
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
                        onChange={(e) => setName(e.parameters.value)}
                        style={sapUiSmallMarginBottom}
                        placeholder={`${name}`}
                    />
                    <Label>Type</Label>
                    <Select
                        style={sapUiSmallMarginBottom}
                        onChange={handleSelectType}
                    >
                        <Option selected={`${activityType}` === WALKING} icon="physical-activity" value={WALKING.name}>
                            {WALKING.displayName} ({WALKING.metric})
                        </Option>
                        <Option selected={activityType === BIKE_RIDE} icon="supplier" value={BIKE_RIDE.name}>
                            {BIKE_RIDE.displayName} ({BIKE_RIDE.metric})
                        </Option>
                        <Option
                            selected={activityType === BUS_RIDE}
                            icon="bus-public-transport"
                            value={BUS_RIDE.name}
                        >
                            {BUS_RIDE.displayName} ({BUS_RIDE.metric})
                        </Option>
                        <Option selected={activityType === TRAIN_RIDE} icon="passenger-train" value={TRAIN_RIDE.name}>
                            {TRAIN_RIDE.displayName} ({TRAIN_RIDE.metric})
                        </Option>
                        <Option selected={activityType === VEGETARIAN_MEAL} icon="meal" value={VEGETARIAN_MEAL.name}>
                            {VEGETARIAN_MEAL.displayName} (
                            {VEGETARIAN_MEAL.metric})
                        </Option>
                    </Select>
                    <Label>Target</Label>
                    <Input
                        type={InputType.Number}
                        placeholder={`${target} (${initialState.metric})`}
                        onChange={(e) => setTarget(e.parameters.value)}
                        style={sapUiSmallMarginBottom}
                    />
                    <Label>Target Date of Completion</Label>
                    <DatePicker
                        valueState={ValueState.None}
                        formatPattern={DATE_FORMAT}
                        primaryCalendarType={CalendarType.Gregorian}
                        disabled={false}
                        readonly={false}
                        onChange={(date) => setSelectedDate(date.parameters.value)}
                        placeholder={selectedDate}
                    />
                </FlexBox>
            </section>
        </Dialog>
    );
};

const mapStateToProps = ({ goals, editGoalModal }) => ({
    goal: goals.data.find((goal) => {
        if (goal.id === editGoalModal.id) {
            console.log(goal);
            console.log(editGoalModal);
            return true;
        }
        return false;
    }),
    editGoalModal,
});

const mapDispatchToProps = (dispatch) => ({
    toggleEditGoalModal: (id) => dispatch(UI.toggleEditGoalModal(id)),
    editGoal: (id, updates) => dispatch(Goal.edit(id, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGoalModal);
