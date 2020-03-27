import React from "react";
import { connect } from "react-redux";
import {
    Button,
    ObjectPage,
    ObjectPageSection
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import CalendarCard from "../Components/CalendarCard";
import ActivityHistory from "../Components/ActivityHistory";
import { UI } from "../redux/actionCreators";

const DetailPage = ({ toggleAddActivityModal }) => (
    <ObjectPage
        title="Climate Hero"
        headerActions={[
            <Button onClick={toggleAddActivityModal}>Track</Button>
        ]}
        style={{ height: "100vh", ...spacing.sapUiContentPadding }}
    >
        <ObjectPageSection title="Calendar View" id="calenderView">
            <CalendarCard />
        </ObjectPageSection>
        <ObjectPageSection title="Activity History" id="activityHistory">
            <ActivityHistory />
        </ObjectPageSection>
    </ObjectPage>
);

const mapDispatchToProps = dispatch => ({
    toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal())
});

export default connect(null, mapDispatchToProps)(DetailPage);
