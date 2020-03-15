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
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
            style={sapUiContentPadding}
        >
            <Title level={TitleLevel.H3}>{props.name}</Title>
            <Title level={TitleLevel.H5}>
                <p style={{ color: "grey" }}>Start Date:</p>
                {props.startDate}
            </Title>
            <Title level={TitleLevel.H5}>
                <p style={{ color: "grey" }}>Target Date:</p>
                {props.targetDate}
            </Title>
            <Title level={TitleLevel.H5}>
                <p style={{ color: "grey" }}>Target:</p>
                {props.target}
            </Title>
            <ProgressIndicator
                displayValue={props.progress + "%"}
                percentValue={props.progress}
                width="180px"
                state={props.infoState}
            />
        </FlexBox>
    );
}
