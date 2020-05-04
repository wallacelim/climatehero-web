import React, { useState, useEffect } from "react";
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
    DatePicker,
    CalendarType,
    Label,
} from "@ui5/webcomponents-react";
import {
    sapUiContentPadding,
    sapUiTinyMargin,
    sapUiSmallMarginBottom,
} from "@ui5/webcomponents-react-base/lib/spacing";
import {
    COMMUTE_BUS,
    COMMUTE_TRAIN,
    COMMUTE_BIKE,
    MEAL_VEGETARIAN,
} from "../../constants/activityTypes";
import { Goal, UI } from "../../redux/actionCreators";
import "@ui5/webcomponents-icons/dist/icons/meal";
import "@ui5/webcomponents-icons/dist/icons/passenger-train";
import "@ui5/webcomponents-icons/dist/icons/physical-activity";
import "@ui5/webcomponents-icons/dist/icons/bus-public-transport";
import "@ui5/webcomponents-icons/dist/icons/supplier";
import { getActivityTypeFromString } from "../../util/activities";
import { DATE_FORMAT } from "../../constants/stringFormats";
import { getDateFromString } from "../../util/datetime";

const EditGoalModal = ({
    goal,
    editGoalModal,
    toggleEditGoalModal,
    editGoal,
    deleteGoal,
}) => {
    const [title, setTitle] = useState();
    const [target, setTarget] = useState();
    const [activityType, setActivityType] = useState();
    const [selectedStartDate, setSelectedStartDate] = useState();
    const [selectedTargetDate, setSelectedTargetDate] = useState();

    useEffect(() => {
        if (goal) {
            setTitle(goal.title);
            setTarget(goal.measurement);
            setActivityType(goal.type);
            setSelectedStartDate(goal.dateStart);
            setSelectedTargetDate(goal.dateTarget);
        }
    }, [goal, editGoalModal]);

    const handleSelectType = (e) => {
        setActivityType(
            getActivityTypeFromString(e.parameters.selectedOption.value)
        );
    };

    const handleEdit = () => {
        if (!title) {
            alert("Please enter a goal title");
            return;
        }
        if (!target) {
            alert("Please enter a non-zero value");
            return;
        }
        if (!selectedStartDate) {
            alert("Please select a valid start date");
            return;
        }

        if (!selectedTargetDate) {
            alert("Please select a valid target date of completion");
            return;
        }

        if (
            getDateFromString(selectedStartDate) >=
            getDateFromString(selectedTargetDate)
        ) {
            alert(
                "Please ensure that the target date of completion is set after the start date"
            );
            return;
        }
        toggleEditGoalModal(goal.id);
        const updatedGoal = {
            title,
            userId: goal.userId,
            type: activityType,
            metric: activityType.metric,
            measurement: parseFloat(target).toFixed(2),
            fulfillment: goal.fulfillment,
            dateStart: selectedStartDate,
            dateTarget: selectedTargetDate,
        };
        editGoal(goal.id, updatedGoal);
    };

    const handleDelete = () => {
        toggleEditGoalModal();
        deleteGoal(goal.id);
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
                        design={ButtonDesign.Default}
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
                        <Button
                            design={ButtonDesign.Reject}
                            onClick={handleDelete}
                            style={sapUiTinyMargin}
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
                justfyContent={FlexBoxJustifyContent.Center}
            >
                <Label>Name</Label>
                <Input
                    type={InputType.Text}
                    onChange={(e) => setTitle(e.parameters.value)}
                    style={sapUiSmallMarginBottom}
                    value={`${title}`}
                />
                <Label>Type</Label>
                <Select
                    style={sapUiSmallMarginBottom}
                    onChange={handleSelectType}
                >
                    <Option
                        selected={activityType === COMMUTE_BIKE}
                        icon="supplier"
                        value={COMMUTE_BIKE.name}
                    >
                        {COMMUTE_BIKE.displayName} ({COMMUTE_BIKE.metric})
                    </Option>
                    <Option
                        selected={activityType === COMMUTE_BUS}
                        icon="bus-public-transport"
                        value={COMMUTE_BUS.name}
                    >
                        {COMMUTE_BUS.displayName} ({COMMUTE_BUS.metric})
                    </Option>
                    <Option
                        selected={activityType === COMMUTE_TRAIN}
                        icon="passenger-train"
                        value={COMMUTE_TRAIN.name}
                    >
                        {COMMUTE_TRAIN.displayName} ({COMMUTE_TRAIN.metric})
                    </Option>
                    <Option
                        selected={activityType === MEAL_VEGETARIAN}
                        icon="meal"
                        value={MEAL_VEGETARIAN.name}
                    >
                        {MEAL_VEGETARIAN.displayName} ({MEAL_VEGETARIAN.metric})
                    </Option>
                </Select>
                <Label>
                    Target ({activityType ? activityType.metric : ""})
                </Label>
                <Input
                    type={InputType.Number}
                    placeholder={`${target} (${
                        activityType ? activityType.metric : ""
                    })`}
                    value={target}
                    onChange={(e) => {
                        setTarget(e.parameters.value);
                    }}
                    style={sapUiSmallMarginBottom}
                />
                <Label>Start Date</Label>
                <DatePicker
                    valueState={ValueState.None}
                    formatPattern={DATE_FORMAT}
                    primaryCalendarType={CalendarType.Gregorian}
                    disabled={false}
                    readonly={false}
                    onChange={(date) =>
                        setSelectedStartDate(date.parameters.value)
                    }
                    value={selectedStartDate}
                    style={sapUiSmallMarginBottom}
                />
                <Label>Target Date of Completion</Label>
                <DatePicker
                    valueState={ValueState.None}
                    formatPattern={DATE_FORMAT}
                    primaryCalendarType={CalendarType.Gregorian}
                    disabled={false}
                    readonly={false}
                    onChange={(date) =>
                        setSelectedTargetDate(date.parameters.value)
                    }
                    value={selectedTargetDate}
                />
            </FlexBox>
        </Dialog>
    );
};

const mapStateToProps = ({ goals, editGoalModal }) => ({
    goal: goals.data.find((goal) => {
        if (goal.id === editGoalModal.id) {
            return true;
        }
        return false;
    }),
    editGoalModal,
});

const mapDispatchToProps = (dispatch) => ({
    toggleEditGoalModal: (goalId) => dispatch(UI.toggleEditGoalModal(goalId)),
    editGoal: (id, updates) => dispatch(Goal.edit(id, updates)),
    deleteGoal: (goalId) => dispatch(Goal.delete(goalId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGoalModal);
