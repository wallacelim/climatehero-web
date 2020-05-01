/* eslint-disable react/jsx-filename-extension */
import "react-app-polyfill/stable";
/* UI5 imports */
import { ThemeProvider } from "@ui5/webcomponents-react/lib/ThemeProvider";

// import "@ui5/webcomponents/dist/json-imports/i18n"
// import "@ui5/webcomponents-fiori/dist/json-imports/i18n";
// import "@ui5/webcomponents-icons/dist/json-imports/i18n";

/* React imports */
import React from "react";
import "./App.css";

/* Local imports */
import ClimateHeroApp from "./ClimateHeroApp";

function App() {
    return (
        <ThemeProvider withToastContainer>
            <ClimateHeroApp />
        </ThemeProvider>
    );
}

export default App;
