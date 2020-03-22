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
} from "@ui5/webcomponents-react";
import { DatePicker } from "@ui5/webcomponents-react/lib/DatePicker";
import moment from "moment";
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

const AddGoalModal = ({ showAddGoalModal, toggleAddGoalModal, addGoal }) => {
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
            startDate: moment().format("DD/MM/YYYY"),
            targetDate: selectedDate,
            type: activityType,
            currentMeasurement: 0,
            targetMeasurement: parseInt(target, 10),
            metric: activityType.metric,
            progress: 0,
        };
        addGoal(goal);
    };

    const handleSelectType = (e) => {
        const name = e.parameters.selectedOption.value;
        switch (name) {
        case WALKING.name:
            setActivityType(WALKING);
            break;
        case BIKE_RIDE.name:
            setActivityType(BIKE_RIDE);
            break;
        case BUS_RIDE.name:
            setActivityType(BUS_RIDE);
            break;
        case TRAIN_RIDE.name:
            setActivityType(TRAIN_RIDE);
            break;
        case VEGETARIAN_MEAL.name:
            setActivityType(VEGETARIAN_MEAL);
            break;
        default:
            console.error("Error setting activityType");
        }
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
                </FlexBox>,
            ]}
            stretch={false}
            open={showAddGoalModal}
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
                    <Input
                        type={InputType.Text}
                        onChange={(e) => setName(e.parameters.value)}
                        style={sapUiSmallMarginBottom}
                        placeholder="Goal Name"
                    />
                    <Select
                        style={sapUiSmallMarginBottom}
                        onChange={handleSelectType}
                    >
                        <Option icon="physical-activity" value={WALKING.name}>
                            {WALKING.displayName} ({WALKING.metric})
                        </Option>
                        <Option icon="supplier" value={BIKE_RIDE.name}>
                            {BIKE_RIDE.displayName} ({BIKE_RIDE.metric})
                        </Option>
                        <Option
                            icon="bus-public-transport"
                            value={BUS_RIDE.name}
                        >
                            {BUS_RIDE.displayName} ({BUS_RIDE.metric})
                        </Option>
                        <Option icon="passenger-train" value={TRAIN_RIDE.name}>
                            {TRAIN_RIDE.displayName} ({TRAIN_RIDE.metric})
                        </Option>
                        <Option icon="meal" value={VEGETARIAN_MEAL.name}>
                            {VEGETARIAN_MEAL.displayName} (
                            {VEGETARIAN_MEAL.metric})
                        </Option>
                    </Select>
                    <Input
                        type={InputType.Number}
                        placeholder="Goal"
                        onChange={(e) => setTarget(e.parameters.value)}
                        style={sapUiSmallMarginBottom}
                    />
                    <DatePicker
                        valueState={ValueState.None}
                        formatPattern="yyyy-MM-dd"
                        primaryCalendarType={CalendarType.Gregorian}
                        disabled={false}
                        readonly={false}
                        onChange={(date) => setSelectedDate(date.parameters.value)
                        }
                        placeholder="Target Date of Completion"
                    />
                </FlexBox>
            </section>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({
    showAddGoalModal: state.showAddGoalModal,
});

const mapDispatchToProps = (dispatch) => ({
    toggleAddGoalModal: () => dispatch(UI.toggleAddGoalModal()),
    addGoal: (goal) => dispatch(Goal.add(goal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGoalModal);
