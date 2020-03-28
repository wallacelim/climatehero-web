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
    COMMUTE_BUS,
    COMMUTE_TRAIN,
    COMMUTE_BIKE,
    MEAL_VEGETARIAN
} from "../constants/activityTypes";
import { Goal, UI } from "../redux/actionCreators";
import "@ui5/webcomponents-icons/dist/icons/meal";
import "@ui5/webcomponents-icons/dist/icons/passenger-train";
import "@ui5/webcomponents-icons/dist/icons/physical-activity";
import "@ui5/webcomponents-icons/dist/icons/bus-public-transport";
import "@ui5/webcomponents-icons/dist/icons/supplier";
import {
    getCurrentDateString,
    getCurrentDateTimeString
} from "../util/dateTime";
import { getActivityTypeFromString } from "../util/activities";
import { DATE_FORMAT } from "../constants/stringFormats";

const AddGoalModal = ({
    userId,
    addGoalModal,
    toggleAddGoalModal,
    addGoal
}) => {
    const [title, setTitle] = useState("");
    const [target, setTarget] = useState(0);
    const [activityType, setActivityType] = useState(WALKING);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleAdd = () => {
        if (!title) {
            alert("Please enter a goal title");
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
            userId,
            dateCreated: getCurrentDateTimeString(),
            title,
            type: activityType,
            metric: activityType.metric,
            measurement: parseInt(target, 10),
            fulfillment: 0,
            dateStart: getCurrentDateString(),
            dateTarget: selectedDate
        };
        addGoal(goal);
    };

    const handleSelectType = e => {
        setActivityType(
            getActivityTypeFromString(e.parameters.selectedOption.value)
        );
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
            footer={
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
                        onChange={e => setTitle(e.parameters.value)}
                        style={sapUiSmallMarginBottom}
                        placeholder="e.g. Travel by bus"
                    />
                    <Label>Type</Label>
                    <Select
                        style={sapUiSmallMarginBottom}
                        onChange={handleSelectType}
                    >
                        <Option icon="physical-activity" value={WALKING.title}>
                            {WALKING.displayName} ({WALKING.metric})
                        </Option>
                        <Option icon="supplier" value={COMMUTE_BIKE.title}>
                            {COMMUTE_BIKE.displayName} ({COMMUTE_BIKE.metric})
                        </Option>
                        <Option
                            icon="bus-public-transport"
                            value={COMMUTE_BUS.title}
                        >
                            {COMMUTE_BUS.displayName} ({COMMUTE_BUS.metric})
                        </Option>
                        <Option
                            icon="passenger-train"
                            value={COMMUTE_TRAIN.title}
                        >
                            {COMMUTE_TRAIN.displayName} ({COMMUTE_TRAIN.metric})
                        </Option>
                        <Option icon="meal" value={MEAL_VEGETARIAN.title}>
                            {MEAL_VEGETARIAN.displayName} (
                            {MEAL_VEGETARIAN.metric})
                        </Option>
                    </Select>
                    <Label>Target ({activityType.metric})</Label>
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
                            setSelectedDate(date.parameters.value)
                        }
                        placeholder={selectedDate}
                    />
                </FlexBox>
            </section>
        </Dialog>
    );
};

const mapStateToProps = ({ user, addGoalModal }) => ({
    userId: user.data.id,
    addGoalModal
});

const mapDispatchToProps = dispatch => ({
    toggleAddGoalModal: () => dispatch(UI.toggleAddGoalModal()),
    addGoal: goal => dispatch(Goal.add(goal))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGoalModal);
