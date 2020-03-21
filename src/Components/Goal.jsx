import React from "react";
import {
    ProgressIndicator,
    Title,
    FlexBox,
    TitleLevel,
    FlexBoxDirection,
    FlexBoxAlignItems,
    FlexBoxJustifyContent
} from "@ui5/webcomponents-react";
import { sapUiContentPadding } from "@ui5/webcomponents-react-base/lib/spacing";

export default function Goal(props) {
    return (
        <FlexBox
            direction={FlexBoxDirection.Row}
            alignItems={FlexBoxAlignItems.Center}
            justifyContent={FlexBoxJustifyContent.Start}
            style={{ ...sapUiContentPadding, width: "100%" }}
        >
            <Title
                level={TitleLevel.H3}
                style={{ width: "30%", margin: "0px" }}
            >
                {props.name}
            </Title>
            <Title
                level={TitleLevel.H5}
                style={{ width: "15%", margin: "0px" }}
            >
                <p style={{ color: "grey" }}>Start Date:</p>
                {props.startDate}
            </Title>
            <Title
                level={TitleLevel.H5}
                style={{ width: "15%", margin: "0px" }}
            >
                <p style={{ color: "grey" }}>Target Date:</p>
                {props.targetDate}
            </Title>
            <Title
                level={TitleLevel.H5}
                style={{ width: "15%", margin: "0px" }}
            >
                <p style={{ color: "grey" }}>Target:</p>
                {props.target}
            </Title>
            <ProgressIndicator
                displayValue={props.progress + "%"}
                percentValue={props.progress}
                width="20%"
                style={{ margin: "0px" }}
                state={props.infoState}
            />
        </FlexBox>
    );
}
