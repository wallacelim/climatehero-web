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
    Dialog,
    FlexBox,
    FlexBoxAlignItems,
    FlexBoxDirection,
    FlexBoxJustifyContent,
    Input,
    InputType,
    Option,
    Select,
} from "@ui5/webcomponents-react";
import {
    sapUiContentPadding,
    sapUiSmallMarginBottom,
    sapUiTinyMargin,
} from "@ui5/webcomponents-react-base/lib/spacing";

import {
    BIKE_RIDE,
    BUS_RIDE,
    TRAIN_RIDE,
    VEGETARIAN_MEAL,
    WALKING,
} from "../constants/activityTypes";
import { Activity, Goals, UI } from "../redux/actionCreators";
import { getCurrentDateTimeString } from "../util/dateTime";

const AddActivityModal = ({
    showAddActivityModal,
    toggleAddActivityModal,
    addActivity,
    updateGoals,
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
            date: getCurrentDateTimeString,
            type: activityType,
            measurement: parseInt(input, 10),
            metric: activityType.metric,
            reduction: (Math.random() * 10).toFixed(2),
            recurrence: Math.round(Math.random()) ? "Weekly" : "N/A",
        };
        addActivity(activity);
        updateGoals(activity);
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
                        value={input}
                        onChange={(e) => setInput(e.parameters.value)}
                    />
                </FlexBox>
            </section>
        </Dialog>
    );
};
const mapStateToProps = ({ showAddActivityModal }) => ({
    showAddActivityModal,
});

const mapDispatchToProps = (dispatch) => ({
    toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal()),
    addActivity: (activity) => dispatch(Activity.add(activity)),
    updateGoals: (activity) => dispatch(Goals.update(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddActivityModal);
