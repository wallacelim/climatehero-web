import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "@ui5/webcomponents-icons/dist/icons/add";
import DetailPage from "./Pages/DetailPage";
import HomePage from "./Pages/HomePage";
import AddActivityModal from "./Components/AddActivityModal";
import AddGoalModal from "./Components/AddGoalModal";
import WelcomeModal from "./Components/WelcomeModal";
import EditGoalModal from "./Components/EditGoalModal";

export default function ClimateHeroApp() {
    const history = createBrowserHistory();

    return (
        <Router history={history}>
            <Switch>
                <Route path="/detail" component={DetailPage} />
                <Route path="/home" component={HomePage} />
                <Redirect from="/" to="/home" />
            </Switch>
            <AddActivityModal />
            <AddGoalModal />
            <WelcomeModal />
            <EditGoalModal />
        </Router>
    );
}
