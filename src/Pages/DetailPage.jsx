import React from "react";
import { connect } from "react-redux";
import {
    Button,
    ObjectPage,
    ObjectPageSection
} from "@ui5/webcomponents-react";
import CalendarCard from "../Components/CalendarCard";
import ActivityHistory from "../Components/ActivityHistory";
import { UI } from "../redux/actionCreators";
import { spacing } from "@ui5/webcomponents-react-base";

const DetailPage = ({ toggleAddActivityModal }) => {
    const [steps, setSteps] = React.useState(0);
    const [bikeMins, setBikeMins] = React.useState(0);
    const [busMins, setBusMins] = React.useState(0);
    const [veggieMeals, setVeggieMeals] = React.useState(0);
    const handleStepsChange = React.useCallback(
        event => {
            const step = event.originalEvent.target.value;
            setSteps(step);
        },
        [setSteps]
    );
    const handleBikeMinsChange = React.useCallback(
        event => {
            const bikeMin = event.originalEvent.target.value;
            setBikeMins(bikeMin);
        },
        [setBikeMins]
    );
    const handleBusMinsChange = React.useCallback(
        event => {
            const busMin = event.originalEvent.target.value;
            setBusMins(busMin);
        },
        [setBusMins]
    );
    const handleVeggieMealsChange = React.useCallback(
        event => {
            const veggieMeal = event.originalEvent.target.value;
            setVeggieMeals(veggieMeal);
        },
        [setVeggieMeals]
    );

    return (
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
};

const mapDispatchToProps = dispatch => ({
    toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal())
});

export default connect(null, mapDispatchToProps)(DetailPage);
