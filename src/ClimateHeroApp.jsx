import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "@ui5/webcomponents-icons/dist/icons/add.js";
import DetailPage from "./Pages/DetailPage";
import HomePage from "./Pages/HomePage";
import AddActivityModal from "./Components/AddActivityModal";
import AddGoalModal from "./Components/AddGoalModal";

export function ClimateHeroApp() {
    const history = createBrowserHistory();
    const handleLogoClick = () => {
        history.push("/");
    };
    return (
        <Router history={history}>
            <Switch>
                <Route path="/detail" component={DetailPage} />
                <Route path="/home" component={HomePage} />
                <Redirect from="/" to="/home" />
            </Switch>
            <AddActivityModal />
            <AddGoalModal />
        </Router>
    );
}
