import React, {useState} from "react";
import { createUseStyles } from "react-jss";
import { Popover } from '@ui5/webcomponents-react/lib/Popover'

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

const useStyles = createUseStyles(styles);

export function ActivityPopover(props) {

    const [title, setTitle] = useState(props.title)

    const classes = useStyles();

    return (
        <Popover open id="activityPopover" headerText="Newsletter subscription">
        </Popover>
    );
};