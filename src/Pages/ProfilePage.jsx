import React from "react";
import { connect } from "react-redux";
import { ObjectPage } from "@ui5/webcomponents-react/lib/ObjectPage";
import { ObjectPageMode } from "@ui5/webcomponents-react/lib/ObjectPageMode";
import { ObjectPageSection } from "@ui5/webcomponents-react/lib/ObjectPageSection";
import { spacing } from "@ui5/webcomponents-react-base";
import { Button } from "@ui5/webcomponents-react/lib/Button";
import DraggableCard from "../Components/Containers/DraggableCard";
import { toggleAddActivityModal } from "../redux/actionCreators";

function ProfilePage({ toggleAddActivityModal }) {
    return (
        <ObjectPage
            title="Profile Page"
            subTitle="Welcome, Test User"
            headerActions={[
                <Button onClick={toggleAddActivityModal}>Track</Button>
            ]}
            mode={ObjectPageMode.Default}
            style={{ ...spacing.sapUiContentPadding }}
        >
            <ObjectPageSection title="Trends" id="profilePageTrendsSection">
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    card="Trends"
                />
            </ObjectPageSection>
            <ObjectPageSection title="Goals" id="profilePageGoalsSection">
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    card="Goals"
                />
            </ObjectPageSection>
            <ObjectPageSection title="History" id="profile">
                <DraggableCard
                    style={spacing.sapUiContentPadding}
                    card="History"
                />
            </ObjectPageSection>
        </ObjectPage>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleAddActivityModal: () => dispatch(toggleAddActivityModal())
});

export default connect(null, mapDispatchToProps)(ProfilePage);
