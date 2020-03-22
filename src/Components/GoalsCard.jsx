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
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import Goal from "./Goal";
import { UI } from "../redux/actionCreators";

import "@ui5/webcomponents-icons/dist/icons/activities";

import "@ui5/webcomponents-icons/dist/icons/add-activity";

function GoalsCard({ goals, toggleAddGoalModal }) {
    // const handleItemClick = (item) => {
    // TODO: enable editing of goals
    // };

    const getMetaData = (progress) => {
        let infoState; let
            info;
        if (progress <= 0) {
            infoState = ValueState.Error;
            info = "Started";
        } else if (progress >= 100) {
            infoState = ValueState.Success;
            info = "Completed";
        } else {
            infoState = ValueState.Warning;
            info = "In Progress";
        }
        return {
            infoState,
            info,
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
                    marginRight: "15px",
                }}
            >
                Add a goal
            </Button>
            <Card
                heading="Your Carbon Footprint Reduction Goals"
                subtitle="Click to add a goal"
                style={{
                    ...spacing.sapUiContentPadding,
                    height: "100%",
                }}
                avatar={<Icon name="activities" />}
            >
                <List mode={ListMode.None} /* onItemClick={handleItemClick} */>
                    {goals.data.map((goal) => {
                        const metadata = getMetaData(goal.progress);
                        return (
                            <StandardListItem
                                key={goal.id}
                                id={goal.id}
                                style={{ height: "80px" }}
                                infoState={metadata.infoState}
                            >
                                <Goal
                                    style={{ height: "80px" }}
                                    progress={goal.progress}
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
        </>
    );
}

const mapStateToProps = ({ goals }) => ({
    goals,
});

const mapDispatchToProps = (dispatch) => ({
    toggleAddGoalModal: () => dispatch(UI.toggleAddGoalModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalsCard);
