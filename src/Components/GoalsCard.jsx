import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { List } from "@ui5/webcomponents-react/lib/List";
import {
    ListMode,
    Card,
    Icon,
    StandardListItem,
    ValueState
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import Goal from "./Goal";

function GoalsCard({ goals }) {
    const handleItemClick = item => {
        console.log(item.parameters.item.id);
        console.log();
    };
    const getMetaData = progress => {
        let infoState, info;
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
            info
        };
    };
    return (
        <Card
            heading="Your Carbon Footprint Reduction Goals"
            subtitle="List"
            style={{ ...spacing.sapUiContentPadding, height: "100%" }}
            avatar={<Icon name="list" />}
        >
            <List mode={ListMode.None} onItemClick={handleItemClick}>
                {goals.map(goal => {
                    const metadata = getMetaData(goal.progress);
                    return (
                        <StandardListItem
                            key={goal.id}
                            id="test1"
                            info={metadata.info}
                            style={{ height: "80px" }}
                            infoState={metadata.infoState}
                        >
                            <Goal
                                style={{ height: "80px" }}
                                progress={goal.progress}
                                text={goal.text}
                                infoState={metadata.infoState}
                            />
                        </StandardListItem>
                    );
                })}
            </List>
        </Card>
    );
}

const mapStateToProps = ({ goals }) => {
    return { goals };
};
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(GoalsCard);
