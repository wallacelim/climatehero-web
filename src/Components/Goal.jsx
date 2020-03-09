import React from "react";
import {
    ProgressIndicator,
    Title,
    TitleLevel,
    FlexBox,
    FlexBoxDirection
} from "@ui5/webcomponents-react";

export default function Goal(props) {
    return (
        <FlexBox direction={FlexBoxDirection.Column}>
            <Title level={TitleLevel.H5}>{props.text}</Title>
            <ProgressIndicator
                displayValue={props.progress + "%"}
                percentValue={props.progress}
                width="180px"
                state={props.infoState}
            />
        </FlexBox>
    );
}
