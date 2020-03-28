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
    Select
} from "@ui5/webcomponents-react";
import {
    sapUiContentPadding,
    sapUiSmallMarginBottom,
    sapUiTinyMargin
} from "@ui5/webcomponents-react-base/lib/spacing";

import {
    COMMUTE_BIKE,
    COMMUTE_BUS,
    COMMUTE_TRAIN,
    MEAL_VEGETARIAN,
    WALKING
} from "../constants/activityTypes";
import { Activity, Goal, UI } from "../redux/actionCreators";
import { getCurrentDateTimeString } from "../util/dateTime";
import { getActivityTypeFromString } from "../util/activities";

const AddActivityModal = ({
    addActivityModal,
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
            userId: "userId_stub",
            type: activityType,
            metric: activityType.metric,
            measurement: parseInt(input, 10),
            reductionValue: (Math.random() * 10).toFixed(2),
            dateTimeOfActivity: getCurrentDateTimeString
        };
        addActivity(activity);
        updateGoals(activity);
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
                    <h5>Add Your Activity</h5>
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
            open={addActivityModal.isOpen}
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
                        <Option icon="supplier" value={COMMUTE_BIKE.name}>
                            {COMMUTE_BIKE.displayName} ({COMMUTE_BIKE.metric})
                        </Option>
                        <Option
                            icon="bus-public-transport"
                            value={COMMUTE_BUS.name}
                        >
                            {COMMUTE_BUS.displayName} ({COMMUTE_BUS.metric})
                        </Option>
                        <Option
                            icon="passenger-train"
                            value={COMMUTE_TRAIN.name}
                        >
                            {COMMUTE_TRAIN.displayName} ({COMMUTE_TRAIN.metric})
                        </Option>
                        <Option icon="meal" value={MEAL_VEGETARIAN.name}>
                            {MEAL_VEGETARIAN.displayName} (
                            {MEAL_VEGETARIAN.metric})
                        </Option>
                    </Select>
                    <Input
                        type={InputType.Number}
                        value={input}
                        onChange={e => setInput(e.parameters.value)}
                    />
                </FlexBox>
            </section>
        </Dialog>
    );
};
const mapStateToProps = ({ addActivityModal }) => ({
    addActivityModal
});

const mapDispatchToProps = dispatch => ({
    toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal()),
    addActivity: activity => dispatch(Activity.add(activity)),
    updateGoals: activity => dispatch(Goal.updateAll(activity))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddActivityModal);
