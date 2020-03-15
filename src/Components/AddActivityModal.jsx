import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    TOGGLE_ADD_ACTIVITY_MODAL,
    ADD_ACTIVITY
} from "../constants/actionTypes";
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
    ButtonDesign,
    InputType,
    FlexBox,
    FlexBoxDirection,
    FlexBoxJustifyContent
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { sapUiContentPadding } from "@ui5/webcomponents-react-base/lib/spacing";

import "@ui5/webcomponents-icons/dist/icons/meal.js";
import "@ui5/webcomponents-icons/dist/icons/passenger-train.js";
import "@ui5/webcomponents-icons/dist/icons/physical-activity.js";
import "@ui5/webcomponents-icons/dist/icons/bus-public-transport.js";

const AddActivityModal = ({ show, handleClick, handleAddActivity }) => {
    const [activityType, setActivityType] = React.useState(WALKING);
    const [input, setInput] = useState(0);

    const handleAdd = () => {
        if (input === 0) {
            alert("please enter a non-zero value");
            return;
        }
        handleClick();
        const activity = {
            date: new Date(),
            type: activityType,
            measurement: parseInt(input),
            metric: activityType.metric,
            reduction: (Math.random() * 10).toFixed(2),
            recurrence: Math.round(Math.random()) ? "Weekly" : "N/A"
        };
        handleAddActivity(activity);
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
        <div>
            <Dialog
                style={sapUiContentPadding}
                headerText="Track Your Activity"
                stretch={false}
                open={show}
                footer={
                    <div>
                        <FlexBox
                            justifyContent={FlexBoxJustifyContent.Center}
                            style={{ ...spacing.sapUiTinyMargin }}
                        >
                            <Button
                                design={ButtonDesign.Emphasized}
                                onClick={handleAdd}
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
                            style={{ ...spacing.sapUiSmallMarginBottom }}
                            onChange={handleSelectType}
                        >
                            <Option
                                icon="physical-activity"
                                value={WALKING.name}
                            >
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
                            <Option
                                icon="passenger-train"
                                value={TRAIN_RIDE.name}
                            >
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
        </div>
    );
};
const mapStateToProps = ({ showAddActivityModal }) => ({
    show: showAddActivityModal
});

const mapDispatchToProps = dispatch => ({
    handleClick: () => dispatch({ type: TOGGLE_ADD_ACTIVITY_MODAL }),
    handleAddActivity: activity =>
        dispatch({ type: ADD_ACTIVITY, payload: activity })
});
export default connect(mapStateToProps, mapDispatchToProps)(AddActivityModal);
