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

const HistoryCard = ({
    style,
    toggleAddActivityModal,
    toggleAddSeriesModal,
}) => {
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
                <div>
                    <Button
                        design={ButtonDesign.Emphasized}
                        icon="add-activity"
                        onClick={toggleAddActivityModal}
                        style={{ marginRight: "10px" }}
                    >
                        Add an activity
                    </Button>
                    <Button
                        design={ButtonDesign.Emphasized}
                        icon="add-activity"
                        onClick={toggleAddSeriesModal}
                    >
                        Add a recurring activity
                    </Button>
                </div>
            </FlexBox>
            <Card
                heading="Your Activity History"
                subtitle="Click any activity to edit or delete"
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
    toggleAddSeriesModal: () => dispatch(UI.toggleAddSeriesModal()),
});

export default connect(null, mapDispatchToProps)(HistoryCard);
