import React from "react";

import {
    FlexBox,
    Text,
    FlexBoxJustifyContent,
    FlexBoxAlignItems,
} from "@ui5/webcomponents-react";
import { sapUiContentPadding } from "@ui5/webcomponents-react-base/lib/spacing";
import DatePicker from "react-datepicker";
import { DATE_FORMAT } from "../constants/stringFormats";
import "react-datepicker/dist/react-datepicker.css";

const popperModifiers = {
    flip: {
        behavior: ["bottom"] // don't allow it to flip to be above
    },
    preventOverflow: {
        enabled: false
    },
    hide: {
        enabled: false // turn off since needs preventOverflow to be enabled
    }
}

export default ({
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
}) => {
    return (
        <FlexBox
            style={sapUiContentPadding}
            width="50%"
            justifyContent={FlexBoxJustifyContent.SpaceAround}
            alignItems={FlexBoxAlignItems.Center}
        >
            <Text style={{ width: "10%", textAlign: "center" }}>From</Text>
            <DatePicker
                dateFormat={DATE_FORMAT}
                onChange={(date) => {
                    console.log(date);
                    setSelectedStartDate(date);
                }}
                popperPlacement="bottom-start"
                popperModifiers={popperModifiers}
                selected={selectedStartDate}
                style={{ width: "30%" }}
                placeholderText="  Select Start Date"
            />
            <Text style={{ width: "10%", textAlign: "center" }}>To</Text>
            <DatePicker
                dateFormat={DATE_FORMAT}
                onChange={(date) => {
                    console.log(date);
                    setSelectedEndDate(date);
                }}
                popperModifiers={popperModifiers}
                popperPlacement="bottom-start"
                selected={selectedEndDate}
                style={{ width: "30%" }}
                placeholderText="  Select End Date"
            />
        </FlexBox>
    );
};
