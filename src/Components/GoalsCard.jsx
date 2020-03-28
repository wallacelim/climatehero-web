import React from "react";
import { connect } from "react-redux";
import { List } from "@ui5/webcomponents-react/lib/List";
import {
    Button,
    ListMode,
    Card,
    Icon,
    StandardListItem,
    ValueState,
    FlexBox,
    FlexBoxDirection,
    Text,
    FlexBoxJustifyContent,
    FlexBoxWrap,
    FlexBoxAlignItems
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import Goal from "./Goal";
import { UI } from "../redux/actionCreators";

import "@ui5/webcomponents-icons/dist/icons/activities";

import "@ui5/webcomponents-icons/dist/icons/add-activity";

const legendStyles = {
    container: {
        position: "relative",
        top: "-333px",
        right: "20px"
    },
    label: {
        display: "inline-flex",
        width: "150px"
    },
    icon: {
        height: "20px",
        width: "20px",
        marginRight: "5px",
        marginBottom: "2px"
    }
};

function GoalsCard({ goals, toggleAddGoalModal, toggleEditGoalModal }) {
    // const handleItemClick = (item) => {
    // TODO: enable editing of goals
    // };
    const getMetaData = ({ currentMeasurement, targetMeasurement }) => {
        const progress = Math.min(
            Math.round((currentMeasurement / targetMeasurement) * 100),
            100
        );
        let infoState;
        if (progress >= 100) {
            infoState = ValueState.Success;
        } else if (progress <= 30) {
            infoState = ValueState.Error;
        } else {
            infoState = ValueState.Warning;
        }
        return {
            progress,
            infoState
        };
    };

    return (
        <>
            <Button
                icon="add-activity"
                onClick={toggleAddGoalModal}
                style={{
                    float: "right",
                    padding: "5px 10px",
                    marginRight: "15px"
                }}
            >
                Add a goal
            </Button>
            <Card
                heading="Your Reduction Goals"
                subtitle="Click any goal to edit or delete"
                style={{
                    ...spacing.sapUiContentPadding,
                    height: "100%"
                }}
                avatar={<Icon name="activities" />}
            >
                <List
                    mode={ListMode.None} /* onItemClick={handleItemClick} */
                    onItemClick={e =>
                        toggleEditGoalModal(parseInt(e.parameters.item.id, 10))
                    }
                >
                    {goals.data.map(goal => {
                        const metadata = getMetaData(goal);
                        return (
                            <StandardListItem
                                key={goal.id}
                                id={goal.id}
                                style={{ height: "80px" }}
                                infoState={metadata.infoState}
                            >
                                <Goal
                                    style={{ height: "80px" }}
                                    progress={metadata.progress}
                                    name={goal.name}
                                    startDate={goal.startDate}
                                    targetDate={goal.targetDate}
                                    target={`${goal.targetMeasurement} ${goal.metric}`}
                                    infoState={metadata.infoState}
                                />
                            </StandardListItem>
                        );
                    })}
                </List>
            </Card>
            <FlexBox
                direction={FlexBoxDirection.Column}
                wrap={FlexBoxWrap.Wrap}
                alignItems={FlexBoxAlignItems.End}
                justifyContent={FlexBoxJustifyContent.SpaceAround}
                style={legendStyles.container}
            >
                <div style={legendStyles.label}>
                    <div
                        style={{
                            background: "#b00",
                            ...legendStyles.icon
                        }}
                    />
                    <Text>&lt; 30% Complete</Text>
                </div>
                <div style={legendStyles.label}>
                    <div
                        style={{
                            background: "#e9730c",
                            ...legendStyles.icon
                        }}
                    />
                    <Text>&gt; 30% Complete</Text>
                </div>
                <div style={legendStyles.label}>
                    <div
                        style={{
                            background: "#107e3e",
                            ...legendStyles.icon
                        }}
                    />
                    <Text>&lt; 100% Complete</Text>
                </div>
            </FlexBox>
        </>
    );
}

const mapStateToProps = ({ goals }) => ({
    goals
});

const mapDispatchToProps = dispatch => ({
    toggleAddGoalModal: () => dispatch(UI.toggleAddGoalModal()),
    toggleEditGoalModal: id => dispatch(UI.toggleEditGoalModal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalsCard);
