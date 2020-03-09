import React, { useState } from "react";
import {
    ProgressIndicator,
    Title,
    TitleLevel,
    FlexBox,
    FlexBoxDirection
} from "@ui5/webcomponents-react";

export default function Goal(props) {
    const [progress, setProgress] = useState(props.progress);

    return (
        <FlexBox direction={FlexBoxDirection.Column}>
            <Title level={TitleLevel.H5}>{props.text}</Title>
            <ProgressIndicator
                displayValue={progress + "%"}
                percentValue={progress}
                width="180px"
                state={props.infoState}
            />
        </FlexBox>
    );
}
