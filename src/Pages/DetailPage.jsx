import React from "react";
import { connect } from "react-redux";
import {
    Button,
    ObjectPage,
    ObjectPageSection
} from "@ui5/webcomponents-react";
import { CalendarView } from "../Components/Calendar";
import ActivitySummary from "../Components/ActivitySummary";
import AddActivityModal from "../Components/AddActivityModal";
import { TOGGLE_ADD_ACTIVITY_MODAL } from "../constants/actionTypes";

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
        <div>
            <ObjectPage
                title="Climate Hero"
                headerActions={[
                    <Button onClick={toggleAddActivityModal}>Track</Button>
                ]}
            >
                <ObjectPageSection title="Calendar View" id="calenderView">
                    <CalendarView />
                </ObjectPageSection>
                <ObjectPageSection
                    title="Activity Summary"
                    id="activitySummary"
                >
                    <ActivitySummary />
                </ObjectPageSection>
            </ObjectPage>
            <AddActivityModal />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    toggleAddActivityModal: () => {
        dispatch({ type: TOGGLE_ADD_ACTIVITY_MODAL });
    }
});

export default connect(null, mapDispatchToProps)(DetailPage);
