import { Button } from "@ui5/webcomponents-react/lib/Button";
import { Label } from "@ui5/webcomponents-react/lib/Label";
import { ObjectPage } from "@ui5/webcomponents-react/lib/ObjectPage";
import { ObjectPageMode } from "@ui5/webcomponents-react/lib/ObjectPageMode";
import { ObjectPageSection } from "@ui5/webcomponents-react/lib/ObjectPageSection";
import React from "react";
import { connect } from "react-redux";
import { spacing } from "@ui5/webcomponents-react-base";
import { UI } from "../redux/actionCreators";
import DraggableCard from "../Components/Containers/DraggableCard";

function HomePage({ user, toggleAddActivityModal }) {
    return (
        <ObjectPage
            title="Home Page"
            subTitle={`Welcome, ${user.data.firstName} ${user.data.lastName}`}
            headerActions={
                <Button onClick={toggleAddActivityModal}>Track</Button>
            }
            mode={ObjectPageMode.Default}
            style={{
                ...spacing.sapUiContentPadding, height: "100vh", position: "absolute", top: "0",
            }}
        >
            <ObjectPageSection title="Calendar" id="HomePageCalendarSection">
                <Label>Calendar</Label>
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    cardType="Calendar"
                />
            </ObjectPageSection>
            <ObjectPageSection title="Trends" id="HomePageTrendsSection">
                <Label>Trends</Label>
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    cardType="Trends"
                />
            </ObjectPageSection>
            <ObjectPageSection title="Goals" id="HomePageGoalsSection">
                <Label>Goals</Label>
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    cardType="Goals"
                />
            </ObjectPageSection>
            <ObjectPageSection title="History" id="HomePageHistorySection">
                <Label>History</Label>
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    cardType="History"
                />
            </ObjectPageSection>
        </ObjectPage>
    );
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
    toggleAddActivityModal: () => dispatch(UI.toggleAddActivityModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
