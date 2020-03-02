import React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { ActivityPopover } from "../Components/ActivityPopover";
import { List } from "@ui5/webcomponents-react/lib/List";
import {
    ListMode,
    Card,
    Text,
    Icon,
    StandardListItem,
    ValueState,
    ProgressIndicator,
    Title,
    TitleLevel,
    FlexBox,
    FlexBoxDirection
} from "@ui5/webcomponents-react";
import Goal from "./Goal";

export default function GoalsCard(props) {
    let history = useHistory();
    const handleProgressHeaderClick = () => {
        history.push("/detail");
    };

    // const handleGoalSelectionChange = goal => {
    //     console.log(goal)
    // }

    const handleGoalClick = goal => {
        console.log(goal.parameters.item.children);
        // goal.parameters.item.children.push(React.createElement(ActivityPopover, { title:"test2"}, null))
    };

    return (
        <motion.div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "top"
            }}
            drag
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            <Card
                heading="Your Carbon Footprint Reduction Goals"
                subtitle="List"
                style={props.style}
                headerInteractive
                onHeaderClick={handleProgressHeaderClick}
                avatar={<Icon name="list" />}
            >
                <List
                    mode={ListMode.SingleSelect}
                    // onSelectionChange={handleGoalSelectionChange}
                    onItemClick={handleGoalClick}
                >
                    <StandardListItem
                        id="test1"
                        info="finished"
                        infoState={ValueState.Success}
                        children={[
                            <ActivityPopover display="block" title="test" />,
                            <Text>Test</Text>
                        ]}
                    >
                        {/* Line-dry laundry */}
                    </StandardListItem>

                    <StandardListItem
                        info="failed"
                        infoState={ValueState.Error}
                    >
                        Sell the car, buy a horse
                    </StandardListItem>
                    <Goal
                        info="in progress"
                        infoState={ValueState.Warning}
                        progress={89}
                        text="Eat Veggie Lunches"
                    />
                    <StandardListItem
                        info="in progress"
                        infoState={ValueState.Warning}
                        style={{ height: "80px" }}
                    >
                        <FlexBox direction={FlexBoxDirection.Column}>
                            <Title level={TitleLevel.H5}>Cycle to work</Title>
                            <ProgressIndicator
                                displayValue="5%"
                                percentValue={5}
                                width="180px"
                                state={ValueState.Error}
                            />
                        </FlexBox>
                    </StandardListItem>
                </List>
            </Card>
        </motion.div>
    );
}
