import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
    Button,
    ButtonDesign,
    CalendarType,
    DatePicker,
    Dialog,
    FlexBox,
    FlexBoxAlignItems,
    FlexBoxDirection,
    FlexBoxJustifyContent,
    Input,
    InputType,
    Label,
    Option,
    Select,
    Text,
    ValueState,
} from "@ui5/webcomponents-react";
import {
    sapUiContentPadding,
    sapUiSmallMarginBottom,
    sapUiTinyMargin,
} from "@ui5/webcomponents-react-base/lib/spacing";

import {
    COMMUTE_BIKE,
    COMMUTE_BUS,
    COMMUTE_TRAIN,
    MEAL_VEGETARIAN,
} from "../../constants/activityTypes";
import { Series, UI } from "../../redux/actionCreators";
import {
    getCurrentDateString,
    getDateFromString,
    getDateAsString,
} from "../../util/datetime";
import { getActivityTypeFromString } from "../../util/activities";
import { DATE_FORMAT } from "../../constants/stringFormats";
import "@ui5/webcomponents-icons/dist/icons/calendar";
import "@ui5/webcomponents-icons/dist/icons/legend";

const EVERY_WEEKDAY = {
    value: "EVERY_WEEKDAY",
    displayName: "Every weekday",
};
const WEEKLY = {
    value: "WEEKLY",
    displayName: "Weekly",
};
const MONTHLY = {
    value: "MONTHLY",
    displayName: "Monthly",
};

const AddSeriesModal = ({
    addSeriesModal,
    userId,
    toggleAddSeriesModal,
    addSeries,
}) => {
    const [activityType, setActivityType] = React.useState(COMMUTE_BIKE);
    const [input, setInput] = useState(0);
    const [selectedStartDate, setSelectedStartDate] = useState(
        getCurrentDateString
    );
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedCycle, setSelectedCycle] = useState(WEEKLY);

    // TODO: reset fields after every add

    useEffect(() => {
        setSelectedEndDate(
            getDateAsString(
                getDateFromString(selectedStartDate).add(1, "months")
            )
        );
    }, [selectedStartDate]);

    const handleAdd = () => {
        if (!input || input <= 0) {
            alert("Please enter a positive value");
            return;
        }
        if (!selectedEndDate) {
            alert("Please select an end date.");
            return;
        }
        toggleAddSeriesModal();
        const series = {
            userId,
            activityType,
            activityMetric: activityType.metric,
            activityMeasurement: parseFloat(input).toFixed(2),
            seriesFirstDate: selectedStartDate,
            seriesLastDate: selectedEndDate,
            seriesCycle: selectedCycle,
        };
        addSeries(series);
    };

    const handleSelectActivityType = (e) => {
        const name = e.parameters.selectedOption.value;
        setActivityType(getActivityTypeFromString(name));
    };

    return (
        <Dialog
            style={sapUiContentPadding}
            header={[
                <FlexBox
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.SpaceBetween}
                    alignItems={FlexBoxAlignItems.Center}
                    style={sapUiContentPadding}
                >
                    <h5>Add a Recurring Activity</h5>
                    <Button
                        design={ButtonDesign.Reject}
                        onClick={toggleAddSeriesModal}
                        style={sapUiTinyMargin}
                    >
                        Close
                    </Button>
                </FlexBox>,
            ]}
            stretch={false}
            open={addSeriesModal.isOpen}
            footer={
                <div style={{ zIndex: 0 }}>
                    <FlexBox
                        justifyContent={FlexBoxJustifyContent.Center}
                        style={{ ...sapUiTinyMargin, zIndex: "0" }}
                    >
                        <Button
                            design={ButtonDesign.Emphasized}
                            onClick={handleAdd}
                            style={{ ...sapUiTinyMargin, zIndex: "0" }}
                        >
                            Add
                        </Button>
                    </FlexBox>
                </div>
            }
        >
            <FlexBox
                style={{ ...sapUiContentPadding, width: "400px" }}
                direction={FlexBoxDirection.Column}
                justifyContent={FlexBoxJustifyContent.Center}
            >
                <Text style={sapUiContentPadding}>{activityType.infoText}</Text>
                <Label>Type</Label>
                <Select
                    style={sapUiSmallMarginBottom}
                    onChange={handleSelectActivityType}
                >
                    <Option icon="supplier" value={COMMUTE_BIKE.name}>
                        {COMMUTE_BIKE.displayName} ({COMMUTE_BIKE.metric})
                    </Option>
                    <Option
                        icon="bus-public-transport"
                        value={COMMUTE_BUS.name}
                    >
                        {COMMUTE_BUS.displayName} ({COMMUTE_BUS.metric})
                    </Option>
                    <Option icon="passenger-train" value={COMMUTE_TRAIN.name}>
                        {COMMUTE_TRAIN.displayName} ({COMMUTE_TRAIN.metric})
                    </Option>
                    <Option icon="meal" value={MEAL_VEGETARIAN.name}>
                        {MEAL_VEGETARIAN.displayName} ({MEAL_VEGETARIAN.metric})
                    </Option>
                </Select>
                <Label>{activityType.metric}</Label>
                <Input
                    type={InputType.Number}
                    value={input}
                    onChange={(e) => setInput(e.parameters.value)}
                    style={sapUiSmallMarginBottom}
                />
                <Label>Start Date</Label>
                <DatePicker
                    valueState={ValueState.None}
                    formatPattern={DATE_FORMAT}
                    primaryCalendarType={CalendarType.Gregorian}
                    disabled={false}
                    readonly={false}
                    onChange={(date) =>
                        setSelectedStartDate(date.parameters.value)
                    }
                    placeholder={selectedStartDate}
                    style={sapUiSmallMarginBottom}
                />
                <Label>End Date</Label>
                <DatePicker
                    valueState={ValueState.None}
                    formatPattern={DATE_FORMAT}
                    primaryCalendarType={CalendarType.Gregorian}
                    disabled={false}
                    readonly={false}
                    onChange={(date) =>
                        setSelectedEndDate(date.parameters.value)
                    }
                    placeholder={selectedEndDate}
                    style={sapUiSmallMarginBottom}
                />
                <Label>Recurrence</Label>
                <Select
                    style={sapUiSmallMarginBottom}
                    onChange={(e) =>
                        setSelectedCycle(e.parameters.selectedOption.value)
                    }
                >
                    <Option icon="calendar" value={EVERY_WEEKDAY.value}>
                        {EVERY_WEEKDAY.displayName}
                    </Option>
                    <Option icon="legend" value={WEEKLY.value}>
                        {WEEKLY.displayName}
                    </Option>
                    <Option icon="appointment" value={MONTHLY.value}>
                        {MONTHLY.displayName}
                    </Option>
                </Select>
            </FlexBox>
        </Dialog>
    );
};
const mapStateToProps = ({ user, addSeriesModal }) => ({
    addSeriesModal,
    userId: user.data.id,
});

const mapDispatchToProps = (dispatch) => ({
    toggleAddSeriesModal: () => dispatch(UI.toggleAddSeriesModal()),
    addSeries: (series) => dispatch(Series.add(series)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSeriesModal);
