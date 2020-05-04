import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
    Text,
    MessageBox,
    MessageBoxTypes,
    FlexBox,
    FlexBoxAlignItems,
    FlexBoxDirection,
    FlexBoxJustifyContent,
} from "@ui5/webcomponents-react";
import { sapUiContentPadding } from "@ui5/webcomponents-react-base/lib/spacing";

import { UI } from "../../redux/actionCreators";

const WelcomeModal = ({ welcomeModal, toggleWelcomeModal, userData }) => {
    useEffect(() => {
        let toggleOnLoad = true;
        if (toggleOnLoad) {
            setTimeout(() => toggleWelcomeModal(userData.id), 0);
        }
        return () => {
            toggleOnLoad = false;
        };
    }, [userData, toggleWelcomeModal]);
    const handleWelcomeModalClose = () => {
        toggleWelcomeModal();
    };
    return (
        <MessageBox
            type={MessageBoxTypes.INFORMATION}
            style={sapUiContentPadding}
            title="Welcome to Climate Hero"
            open={welcomeModal.isOpen}
            onClose={handleWelcomeModalClose}
        >
            <section>
                <FlexBox
                    style={{ width: "600px" }}
                    alignItems={FlexBoxAlignItems.Start}
                    direction={FlexBoxDirection.Column}
                    justifyContent={FlexBoxJustifyContent.Start}
                >
                    <Text>Hello {userData.firstName},</Text>
                    <br />
                    <Text>
                        Great to have you on board. With this app we would like
                        to motivate colleagues to do some good for the
                        environment, specifically our climate, while at the same
                        time having some fun. And even if you do not care about
                        the climate or human greenhouse gas emissions at all,
                        you might want to contribute to the activities in this
                        app since they likely have a positive effect on your
                        personal health, too.
                    </Text>
                    <br />
                    <Text>
                        So how does it work? Basically, we want you to record
                        all your CO2 reducing activities which you do
                        differently from your past behavior. For example if you
                        take your bike to work instead of coming by car, or if
                        you eat vegetarian instead of having meat. The app will
                        calculate the corresponding savings and show you nice
                        summaries of your personal contribution to a better
                        climate. Plus you can challenge yourself or others to
                        achieve a certain amount of savings in a given
                        timeframe.
                    </Text>
                    <br />
                    <Text>Start being a Climate Hero today and have fun!</Text>
                </FlexBox>
            </section>
        </MessageBox>
    );
};

const mapStateToProps = ({ user, welcomeModal }) => ({
    welcomeModal,
    userData: user.data,
});

const mapDispatchToProps = (dispatch) => ({
    toggleWelcomeModal: (userId) => dispatch(UI.toggleWelcomeModal(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeModal);
