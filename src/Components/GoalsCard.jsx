import React, { useState } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
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
import GoalWithPopover from "./GoalWithPopover";

export default function GoalsCard(props) {
    let history = useHistory();
    const handleProgressHeaderClick = () => {
        history.push("/detail");
    };
    const handleItemClick = item => {
        console.log(item.parameters.item);
    };
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Card
            heading="Your Carbon Footprint Reduction Goals"
            subtitle="List"
            style={props.style}
            headerInteractive
            onHeaderClick={handleProgressHeaderClick}
            avatar={<Icon name="list" />}
        >
            <List mode={ListMode.SingleSelect} onItemClick={handleItemClick}>
                <StandardListItem
                    key={1}
                    id="test1"
                    info="finished"
                    style={{ height: "80px" }}
                    infoState={ValueState.Success}
                >
                    <GoalWithPopover
                        infoState={ValueState.Success}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        style={{ height: "80px" }}
                        progress={100}
                        text={"Sell the car, buy a horse"}
                    />
                </StandardListItem>

                <StandardListItem
                    info="failed"
                    infoState={ValueState.Error}
                    key={2}
                    style={{ height: "80px" }}
                >
                    <GoalWithPopover
                        info="in progress"
                        infoState={ValueState.Error}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        style={{ height: "80px" }}
                        progress={0}
                        text={"Sell the car, buy a horse"}
                    />
                </StandardListItem>
                <StandardListItem
                    key={3}
                    style={{ height: "80px" }}
                    info="in progress"
                    infoState={ValueState.Warning}
                >
                    <GoalWithPopover
                        infoState={ValueState.Warning}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        style={{ height: "80px" }}
                        progress={89}
                        text={"Eat veggie lunches"}
                    />
                </StandardListItem>

                <StandardListItem
                    key={4}
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
    );
}
