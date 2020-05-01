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
    tagline: "Be a ClimateHero today!",
    url: "https://github.wdf.sap.corp/Ie-CoE-SGP/climahtehero-web",
    baseUrl: "/",

    // Used for publishing and more
    projectName: "climate-hero",
    organizationName: "SAP IE CoE",

    headerLinks: [
        { doc: "doc1", label: "Docs" },
        { doc: "doc4", label: "API" },
        { page: "help", label: "Help" },
        { blog: true, label: "Blog" },
    ],

    /* path to images for header/footer */
    headerIcon: "img/favicon.ico",
    footerIcon: "img/favicon.ico",
    favicon: "img/favicon.ico",

    /* Colors for website */
    colors: {
        primaryColor: "#66999c",
        secondaryColor: "#476b6d",
    },

    /* Custom fonts for website */
    /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

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

    // Open Graph and Twitter card images.
    ogImage: "img/undraw_online.svg",
    twitterImage: "img/undraw_tweetstorm.svg",
};

module.exports = siteConfig;
