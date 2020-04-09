/* eslint-disable indent */
import React, { useState } from "react";
import { connect } from "react-redux";
import {
    Button,
    ButtonDesign,
    Card,
    FlexBox,
    FlexBoxJustifyContent,
} from "@ui5/webcomponents-react";
import { Icon } from "@ui5/webcomponents-react/lib/Icon";
import "@ui5/webcomponents-icons/dist/icons/appointment-2";
import "@ui5/webcomponents-icons/dist/icons/appointment";

import { sapUiContentPadding } from "@ui5/webcomponents-react-base/lib/spacing";
import ActivityHistory from "./ActivityHistory";
import { UI } from "../redux/actionCreators";
import TimePeriodSelector from "./TimePeriodSelector";

const HistoryCard = ({ style, toggleAddActivityModal }) => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const resetCalendar = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
    };

    return (
        <>
            <FlexBox
                justifyContent={FlexBoxJustifyContent.SpaceBetween}
                style={{
                    ...style,
                }}
            >
                <Button
                    onClick={resetCalendar}
                    icon="appointment"
                    disabled={!selectedStartDate || !selectedEndDate}
                >
                    Reset Time Filter
                </Button>
                <Button
                    design={ButtonDesign.Emphasized}
                    icon="add-activity"
                    onClick={toggleAddActivityModal}
                >
                    Add an activity
                </Button>
            </FlexBox>
            <Card
                heading="Your Activity History"
                subtitle="Select a date range to view activities"
                style={sapUiContentPadding}
                avatar={<Icon name="appointment-2" />}
            >
                <TimePeriodSelector
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    setSelectedStartDate={setSelectedStartDate}
                    setSelectedEndDate={setSelectedEndDate}
                />
                <ActivityHistory
                    dateRangeStart={selectedStartDate}
                    dateRangeEnd={selectedEndDate}
                />
            </Card>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal()),
});

export default connect(null, mapDispatchToProps)(HistoryCard);
