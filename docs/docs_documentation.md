---
id: docs_documentation
title: Maintaining The Docs
sidebar_label: Maintaining The Docs
---

## About This Website

This documentation site was built using [Docusaurus](https://docusaurus.io/), which is maintained by [Facebook Open Source](https://opensource.facebook.com/).

Effectively, all that is required for editing this site can be found in the [Docusaurus documentation](https://docusaurus.io/docs/en/installation).

Nevertheless, here is a short walkthrough for minor changes:

### Editing

All content here is either written chiefly in [Markdown](https://www.markdownguide.org/) (for documents such as this one) and HTML (for webpages). To edit a document, navigate to the `docs/` directory from the root of the `climatehero-web` project. There, you will find the markdown documents for the various topics (`api_documentation.md`, `web_application_documentation.md`, etc). Simply open and edit those files as required.

### Deployment

> You need to be authenticated with the appropriate SAP Cloud Platform organisation/space to perform the following successfully.

As with the ClimateHero client and server, this documentation site is hosted on the SAP Cloud Platform, via the [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html).

To deploy changes, you will have to first build the documentation site, which can be done in the following 2 steps:

1. Navigate to the `website/` directory.
2. Run the command `npm run build`.

The above will run the `docusaurus-build` script, which will churn out a production-ready version of the project into the `website/build/` directory. Now, your changes are ready to be deployed. You can do so with the following command, while remaining in the `website/` directory:

```
cf push
```

This command will push an updated version of the website to the SAP Cloud Platform, adopting its configurations from the `manifest.yml` file. More information on how to configure the manifest attributes can be found [here](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html).
