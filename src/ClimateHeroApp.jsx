import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "@ui5/webcomponents-icons/dist/icons/add";
import HomePage from "./Pages/HomePage";
import AddActivityModal from "./Components/Modals/AddActivityModal";
import AddSeriesModal from "./Components/Modals/AddSeriesModal";
import AddGoalModal from "./Components/Modals/AddGoalModal";
import WelcomeModal from "./Components/Modals/WelcomeModal";
import EditActivityModal from "./Components/Modals/EditActivityModal";
import EditGoalModal from "./Components/Modals/EditGoalModal";

export default function ClimateHeroApp() {
    const history = createBrowserHistory();

    return (
        <Router history={history}>
            <Switch>
                <Route exact strict path="/" component={HomePage} />
                <Redirect from="/" to="/" />
            </Switch>
            <WelcomeModal />
            <AddActivityModal />
            <EditActivityModal />
            <AddGoalModal />
            <EditGoalModal />
            <AddSeriesModal />
        </Router>
    );
}
