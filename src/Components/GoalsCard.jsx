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
    FlexBoxAlignItems,
    ButtonDesign,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import Goal from "./Goal";
import { UI } from "../redux/actionCreators";

import "@ui5/webcomponents-icons/dist/icons/activities";

import "@ui5/webcomponents-icons/dist/icons/add-activity";

const legendStyles = {
    container: {
        position: "relative",
        margin: "-76px 20px 0px",
        paddingBottom: "10px",
    },
    label: {
        display: "inline-flex",
        width: "150px",
    },
    icon: {
        height: "20px",
        width: "20px",
        marginRight: "5px",
        marginBottom: "2px",
    },
};

function GoalsCard({ userId, goals, toggleAddGoalModal, toggleEditGoalModal }) {
    const getInfoState = ({ fulfillment }) => {
        console.log(`fulfillment: ${fulfillment}`);
        let infoState;
        if (fulfillment >= 100) {
            infoState = ValueState.Success;
        } else if (fulfillment <= 30) {
            infoState = ValueState.Error;
        } else {
            infoState = ValueState.Warning;
        }
        return infoState;
    };

    return (
        <>
            <Button
                icon="add-activity"
                onClick={toggleAddGoalModal}
                design={ButtonDesign.Emphasized}
                style={{
                    float: "right",
                    padding: "5px 10px",
                    marginRight: "15px",
                }}
            >
                Add a goal
            </Button>
            <Card
                heading="Your Reduction Goals"
                subtitle="Click any goal to edit or delete"
                style={{
                    ...spacing.sapUiContentPadding,
                    height: "100%",
                }}
                avatar={<Icon name="activities" />}
            >
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
                                ...legendStyles.icon,
                            }}
                        />
                        <Text>&le; 30% Fulfilled</Text>
                    </div>
                    <div style={legendStyles.label}>
                        <div
                            style={{
                                background: "#e9730c",
                                ...legendStyles.icon,
                            }}
                        />
                        <Text>&gt; 30% Fulfilled</Text>
                    </div>
                    <div style={legendStyles.label}>
                        <div
                            style={{
                                background: "#107e3e",
                                ...legendStyles.icon,
                            }}
                        />
                        <Text>Completed</Text>
                    </div>
                </FlexBox>
                <List
                    mode={ListMode.None} /* onItemClick={handleItemClick} */
                    onItemClick={(e) =>
                        toggleEditGoalModal(e.parameters.item.id)
                    }
                >
                    {goals.data
                        .filter((goal) => goal.userId === userId)
                        .map((goal) => {
                            const infoState = getInfoState(goal);
                            return (
                                <StandardListItem
                                    key={goal.id}
                                    id={goal.id}
                                    style={{ height: "80px" }}
                                    infoState={infoState}
                                >
                                    <Goal
                                        progress={Math.round(goal.fulfillment)}
                                        title={goal.title}
                                        dateStart={goal.dateStart}
                                        dateTarget={goal.dateTarget}
                                        target={`${goal.measurement} ${goal.type.displayMetric}`}
                                        infoState={infoState}
                                    />
                                </StandardListItem>
                            );
                        })}
                </List>
            </Card>
        </>
    );
}

const mapStateToProps = ({ user, goals }) => ({
    userId: user.data.id,
    goals,
});

const mapDispatchToProps = (dispatch) => ({
    toggleAddGoalModal: () => dispatch(UI.toggleAddGoalModal()),
    toggleEditGoalModal: (goalId) => dispatch(UI.toggleEditGoalModal(goalId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalsCard);
