import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ShellBar, ShellBarItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/add.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import SAP_logo from "./Assets/Images/SAP_logo.svg";
import stub_profile_logo from "./Assets/Images/stub_profile_logo.png";
import DetailPage from "./Pages/DetailPage";
import ProfilePage from "./Pages/ProfilePage";

export function ClimateHeroApp() {
    const history = createBrowserHistory();
    const handleLogoClick = () => {
        history.push("/");
    };
    return (
        <Router history={history}>
            <ShellBar
                logo={SAP_logo}
                onLogoClick={handleLogoClick}
                profile={stub_profile_logo}
                primaryTitle={"Climate Hero"}
                notification-count="99+"
                show-notifications
                show-product-switch
                show-co-pilot
            >
                <ShellBarItem icon="add" text="Add" />
            </ShellBar>
            <Switch>
                <Route path="/detail" component={DetailPage} />
                <Route path="/profile" component={ProfilePage} />
                <Redirect from="/" to="/profile" />
            </Switch>
        </Router>
    );
}
