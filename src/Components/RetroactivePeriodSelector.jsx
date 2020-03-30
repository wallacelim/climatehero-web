import React, { useState, useEffect } from "react";

import {
    Select,
    Option,
    FlexBox,
    Text,
    FlexBoxJustifyContent,
    Button,
    FlexBoxAlignItems
} from "@ui5/webcomponents-react";
import {
    sapUiSmallMarginBottom,
    sapUiContentPadding
} from "@ui5/webcomponents-react-base/lib/spacing";
import { DAY, MONTH, YEAR } from "../constants/timeUnits";

export default ({ handleFilter }) => {
    const [timeValue, setTimeValue] = useState(MONTH.defaultValue);
    const [timeUnit, setTimeUnit] = useState(MONTH);

    useEffect(() => {
        handleFilter(timeValue, timeUnit);
        // eslint-disable-next-line
    }, [timeValue, timeUnit]); // TODO: add dependency, fix infinite loop that ensues

    const handleTimeUnitChange = unit => {
        switch (unit) {
            case DAY.unitString:
                setTimeUnit(DAY);
                break;
            case MONTH.unitString:
                setTimeUnit(MONTH);
                break;
            case YEAR.unitString:
                setTimeUnit(YEAR);
                break;
            default:
                throw new Error(`Invalid time unit: ${unit}`);
        }
    };
    return (
        <FlexBox
            style={sapUiContentPadding}
            width="50%"
            justifyContent={FlexBoxJustifyContent.SpaceAround}
            alignItems={FlexBoxAlignItems.Center}
        >
            <Text style={{ width: "10%" }}>Last</Text>
            <Select
                style={{ width: "30%" }}
                onChange={e => setTimeValue(e.parameters.selectedOption.value)}
            >
                {timeUnit.options.map(x => (
                    <Option
                        style={sapUiSmallMarginBottom}
                        selected={x === timeUnit.defaultValue}
                        value={x}
                        key={x}
                    >
                        {x}
                    </Option>
                ))}
            </Select>
            <Select
                style={{ width: "30%" }}
                onChange={e =>
                    handleTimeUnitChange(e.parameters.selectedOption.value)
                }
            >
                <Option style={sapUiSmallMarginBottom} key="days" value="days">
                    {DAY.unitString}
                </Option>
                <Option selected key="months" value="months">
                    {MONTH.unitString}
                </Option>
                <Option key="years" value="years">
                    {YEAR.unitString}
                </Option>
            </Select>
            <Button
                width="20%"
                onClick={() => handleFilter(timeValue, timeUnit)}
            >
                Filter
            </Button>
        </FlexBox>
    );
};
