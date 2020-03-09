import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { List } from "@ui5/webcomponents-react/lib/List";
import {
    ListMode,
    Card,
    Icon,
    StandardListItem,
    ValueState,
    ProgressIndicator,
    Title,
    TitleLevel,
    FlexBox,
    FlexBoxDirection
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import Goal from "./Goal";

function GoalsCard({ goals }) {
    let history = useHistory();
    const handleProgressHeaderClick = () => {
        history.push("/detail");
    };
    const handleItemClick = item => {
        console.log(item.parameters.item.id);
        console.log();
    };
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Card
            heading="Your Carbon Footprint Reduction Goals"
            subtitle="List"
            style={{ ...spacing.sapUiContentPadding, height: "100%" }}
            headerInteractive
            onHeaderClick={handleProgressHeaderClick}
            avatar={<Icon name="list" />}
        >
            <List mode={ListMode.None} onItemClick={handleItemClick}>
                {goals.map(goal => (
                    <StandardListItem
                        key={1}
                        id="test1"
                        info="finished"
                        style={{ height: "80px" }}
                        infoState={ValueState.Success}
                    >
                        <Goal
                            infoState={ValueState.Success}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            style={{ height: "80px" }}
                            progress={100}
                            text={"Sell the car, buy a horse"}
                        />
                    </StandardListItem>
                ))}
                <StandardListItem
                    key={1}
                    id="test1"
                    info="finished"
                    style={{ height: "80px" }}
                    infoState={ValueState.Success}
                >
                    <Goal
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
                    <Goal
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
                    <Goal
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

const mapStateToProps = state => {
    return { goals: state.goals };
};
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(GoalsCard);
