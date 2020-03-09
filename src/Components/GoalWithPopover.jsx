import React, { useState } from "react";
import { Popover } from "@ui5/webcomponents-react/lib/Popover";
import {
    Button,
    PopoverHorizontalAlign,
    PopoverVerticalAlign,
    PlacementType,
    StandardListItem
} from "@ui5/webcomponents-react";
import Goal from "./Goal";

const styles = ({ parameters }) => ({
    container: {
        backgroundColor: parameters.sapUiGlobalBackgroundColor,
        fontFamily: parameters.sapUiFontFamily,
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: parameters.sapUiNegativeText,
        fontSize: parameters.sapUiFontHeader1Size
    }
});

export default function GoalWithPopover(props) {
    const [info, setInfo] = useState(props.info);
    const [infoState, setInfoState] = useState(props.infoState);
    const [text, setText] = useState(props.text);
    const [progress, setProgress] = useState(props.progress);
    const handleClose = () => {
        props.setIsOpen(false);
    };

    return (
        // <Popover
        //     headerText={"Edit Goal"}
        //     placementType={PlacementType.Right}
        //     horizontalAlign={PopoverHorizontalAlign.Center}
        //     verticalAlign={PopoverVerticalAlign.Center}
        //     modal={false}
        //     noArrow={false}
        //     open={props.isOpen}
        //     onBeforeOpen={null}
        //     onAfterOpen={() => props.setIsOpen(true)}
        //     onBeforeClose={null}
        //     onAfterClose={null}
        //     footer={
        //         <div
        //             style={{
        //                 display: "flex",
        //                 justifyContent: "flex-end",
        //                 alignItems: "center",
        //                 width: "18rem",
        //                 height: "9.5rem",
        //                 padding: "20px"
        //             }}
        //         >
        //             <Button onClick={handleClose}>Close</Button>
        //         </div>
        //     }
        //     openBy={
        <Goal
            info={info}
            infoState={infoState}
            progress={progress}
            text={text}
        />
        //     }
        // >
        //     <div>Some stuff</div>
        //     <div>Content</div>
        //     <div>Footer</div>
        // </Popover>
    );
}
