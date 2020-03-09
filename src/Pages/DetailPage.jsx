import React from "react";
import { ObjectPage, ObjectPageSection } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { CalendarView } from "../Components/Calendar";
import { ActivitySummary } from "../Components/ActivitySummary";

export function DetailPage() {
    const [steps, setSteps] = React.useState(0);
    const [bikeMins, setBikeMins] = React.useState(0);
    const [busMins, setBusMins] = React.useState(0);
    const [veggieMeals, setVeggieMeals] = React.useState(0);
    const handleStepsChange = React.useCallback(
        event => {
            console.log(event);
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
    const handleClick = e => {
        e.preventDefault();
        alert(
            `Steps ${steps}, Bike Minutes ${bikeMins}, Bus Minutes ${busMins}, VeggieMeasl ${veggieMeals}`
        );
    };
    return (
        <div>
            <ObjectPage>
                <ObjectPageSection title="Calendar View" id="calenderView">
                    <CalendarView />
                </ObjectPageSection>
                <ObjectPageSection
                    title="Activity Summary"
                    id="activitySummary"
                >
                    <ActivitySummary
                        style={{
                            width: "100%",
                            ...spacing.sapUiContentPadding
                        }}
                    />
                </ObjectPageSection>
            </ObjectPage>
        </div>
    );
}
