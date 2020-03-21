import React from "react";
import { connect } from "react-redux";
import { ObjectPage } from "@ui5/webcomponents-react/lib/ObjectPage";
import { ObjectPageMode } from "@ui5/webcomponents-react/lib/ObjectPageMode";
import { ObjectPageSection } from "@ui5/webcomponents-react/lib/ObjectPageSection";
import { Label } from "@ui5/webcomponents-react/lib/Label";
import { spacing } from "@ui5/webcomponents-react-base";
import { Button } from "@ui5/webcomponents-react/lib/Button";
import CalendarCard from "../Components/CalendarCard";
import DraggableCard from "../Components/Containers/DraggableCard";
import { UI } from "../redux/actionCreators";

function HomePage({ toggleAddActivityModal }) {
    return (
        <ObjectPage
            title="Home Page"
            subTitle="Welcome, Test User"
            headerActions={
                <Button onClick={toggleAddActivityModal}>Track</Button>
            }
            mode={ObjectPageMode.Default}
            style={{ ...spacing.sapUiContentPadding, overflow: "hidden" }}
        >
            <ObjectPageSection title="Calendar" id="HomePageCalendarSection">
                <Label>Calendar</Label>
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    card="Calendar"
                />
            </ObjectPageSection>
            <ObjectPageSection title="Trends" id="HomePageTrendsSection">
                <Label>Trends</Label>
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    card="Trends"
                />
            </ObjectPageSection>
            <ObjectPageSection title="Goals" id="HomePageGoalsSection">
                <Label>Goals</Label>
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    card="Goals"
                />
            </ObjectPageSection>
            <ObjectPageSection title="History" id="HomePageHistorySection">
                <Label>History</Label>
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    card="History"
                />
            </ObjectPageSection>
        </ObjectPage>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal())
});

export default connect(null, mapDispatchToProps)(HomePage);
