/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
    title: "ClimateHero",
    tagline: "Project Documentation - Developer Guide",
    baseUrl: "/",

    // Used for publishing and more
    projectName: "climatehero-web",
    organizationName: "IE-CoE-SGP",

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks: [
        { doc: "web_application_documentation", label: "Web" },
        { doc: "api_documentation", label: "API" },
        { page: "help", label: "Help" },
    ],

    /* path to images for header/footer */
    headerIcon: "img/favicon.png",
    footerIcon: "img/favicon.png",
    favicon: "img/favicon.png",

    /* Colors for website */
    colors: {
        primaryColor: "#5e519a",
        secondaryColor: "#41386b",
    },

    // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
    copyright: `Copyright © ${new Date().getFullYear()} SAP`,

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: "default",
    },

    // Add custom scripts here that would be placed in <script> tags.
    scripts: ["https://buttons.github.io/buttons.js"],

    // On page navigation for the current documentation page.
    onPageNav: "separate",
    // No .html extensions for paths.
    cleanUrl: true,
};

module.exports = siteConfig;
