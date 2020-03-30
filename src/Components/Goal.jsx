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

export default function Goal({
    title,
    dateStart,
    dateTarget,
    target,
    progress,
    infoState
}) {
    return (
        <FlexBox
            direction={FlexBoxDirection.Row}
            alignItems={FlexBoxAlignItems.Center}
            justifyContent={FlexBoxJustifyContent.Start}
            style={{ ...sapUiContentPadding, width: "100%" }}
        >
            <Title
                level={TitleLevel.H3}
                style={{ width: "30%", margin: "0px", ...sapUiContentPadding }}
            >
                {title}
            </Title>
            <Title
                level={TitleLevel.H5}
                style={{ width: "15%", margin: "0px" }}
            >
                <p style={{ color: "grey" }}>Start Date:</p>
                {dateStart}
            </Title>
            <Title
                level={TitleLevel.H5}
                style={{ width: "15%", margin: "0px", ...sapUiContentPadding }}
            >
                <p style={{ color: "grey" }}>Target Date:</p>
                {dateTarget}
            </Title>
            <Title
                level={TitleLevel.H5}
                style={{ width: "15%", margin: "0px", ...sapUiContentPadding }}
            >
                <p style={{ color: "grey" }}>Target:</p>
                {target}
            </Title>
            <ProgressIndicator
                displayValue={`${progress}%`}
                percentValue={progress}
                width="20%"
                style={{ margin: "0px" }}
                state={infoState}
                tooltip="Test"
                zIndex="3"
            />
        </FlexBox>
    );
}
