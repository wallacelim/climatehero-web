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

export default ({ filterByTime }) => {
    const [timeValue, setTimeValue] = useState(MONTH.defaultValue);
    const [timeUnit, setTimeUnit] = useState(MONTH);
    const [shouldFilter, setShouldFilter] = useState(true);

    useEffect(() => {
        setShouldFilter(true);
    }, [filterByTime]);

    useEffect(() => {
        if (shouldFilter) {
            filterByTime(timeValue, timeUnit);
            setShouldFilter(false);
        }
    }, [filterByTime, shouldFilter, timeValue, timeUnit]);

    const handleTimeUnitChange = unit => {
        switch (unit) {
            case DAY.unitString:
                setTimeUnit(DAY);
                setTimeValue(DAY.defaultValue);
                break;
            case MONTH.unitString:
                setTimeUnit(MONTH);
                setTimeValue(MONTH.defaultValue);
                break;
            case YEAR.unitString:
                setTimeUnit(YEAR);
                setTimeValue(YEAR.defaultValue);
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
                onChange={e =>
                    setTimeValue(Number(e.parameters.selectedOption.value))
                }
            >
                {timeUnit.options.map(x => (
                    <Option
                        style={sapUiSmallMarginBottom}
                        selected={x === timeValue}
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
            <Button width="20%" onClick={() => setShouldFilter(true)}>
                Filter
            </Button>
        </FlexBox>
    );
};
