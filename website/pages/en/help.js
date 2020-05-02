/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const { Container } = CompLibrary;
const { GridBlock } = CompLibrary;

function Help(props) {
    const { config: siteConfig, language = "" } = props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const supportLinks = [
        {
            content: `Learn more about the [Frontend](${docUrl(
                "web_application_documentation.html"
            )})\n\nLearn more about the [Backend](${docUrl(
                "api_documentation.html"
            )})`,
            title: "Browse Docs",
        },
    ];

    return (
        <div className="docMainWrapper wrapper">
            <Container className="mainContainer documentContainer postContainer">
                <div className="post">
                    <header className="postHeader">
                        <h1>Need help?</h1>
                    </header>
                    <p>
                        This project is maintained by the SAP IE CoE. For
                        enquiries, please contact{" "}
                        <a href="mailto:wallace.lim@sap.com">Wallace Lim</a>.
                    </p>
                    <GridBlock contents={supportLinks} layout="threeColumn" />
                </div>
            </Container>
        </div>
    );
}

module.exports = Help;
