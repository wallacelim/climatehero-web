import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    WALKING,
    BUS_RIDE,
    TRAIN_RIDE,
    BIKE_RIDE,
    VEGETARIAN_MEAL
} from "../constants/activityTypes";
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
    FlexBoxAlignItems
} from "@ui5/webcomponents-react";
import {
    sapUiContentPadding,
    sapUiTinyMargin,
    sapUiSmallMarginBottom
} from "@ui5/webcomponents-react-base/lib/spacing";

import "@ui5/webcomponents-icons/dist/icons/meal.js";
import "@ui5/webcomponents-icons/dist/icons/passenger-train.js";
import "@ui5/webcomponents-icons/dist/icons/physical-activity.js";
import "@ui5/webcomponents-icons/dist/icons/bus-public-transport.js";
import {
    addActivity,
    toggleAddActivityModal,
    updateGoals
} from "../redux/actionCreators";

const AddActivityModal = ({
    showAddActivityModal,
    toggleAddActivityModal,
    addActivity,
    updateGoals
}) => {
    const [activityType, setActivityType] = React.useState(WALKING);
    const [input, setInput] = useState(0);

    const handleAdd = () => {
        if (!input) {
            alert("please enter a non-zero value");
            return;
        }
        toggleAddActivityModal();
        const activity = {
            date: new Date().toLocaleString(),
            type: activityType,
            measurement: parseInt(input),
            metric: activityType.metric,
            reduction: (Math.random() * 10).toFixed(2),
            recurrence: Math.round(Math.random()) ? "Weekly" : "N/A"
        };
        addActivity(activity);
        updateGoals(activity);
    };

    const handleSelectType = e => {
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

    // useEffect(() =>
    //   fetch("/api/reduction")
    //     .then(res => res.json())
    //     .then(res => this.setState({ planets: res }))
    //     .catch(() => this.setState({ hasErrors: true }))
    // );
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
                    <h5>Track Your Activity</h5>
                    <Button
                        design={ButtonDesign.Reject}
                        onClick={toggleAddActivityModal}
                        style={sapUiTinyMargin}
                    >
                        Close
                    </Button>
                </FlexBox>
            ]}
            stretch={false}
            open={showAddActivityModal}
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
                    justifyContent={FlexBoxJustifyContent.Center}
                >
                    <Select
                        style={sapUiSmallMarginBottom}
                        onChange={handleSelectType}
                    >
                        <Option icon="physical-activity" value={WALKING.name}>
                            {WALKING.displayName} ({WALKING.metric})
                        </Option>
                        <Option icon="" value={BIKE_RIDE.name}>
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
                        value={input}
                        onChange={e => setInput(e.parameters.value)}
                    ></Input>
                </FlexBox>
            </section>
        </Dialog>
    );
};
const mapStateToProps = ({ showAddActivityModal }) => ({
    showAddActivityModal
});

const mapDispatchToProps = dispatch => ({
    toggleAddActivityModal: () => dispatch(toggleAddActivityModal()),
    addActivity: activity => dispatch(addActivity(activity)),
    updateGoals: activity => dispatch(updateGoals(activity))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddActivityModal);
