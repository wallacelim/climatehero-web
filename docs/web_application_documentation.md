---
id: web_application_documentation
title: Documentation for the Web Application (Front End)
sidebar_label: Web Application
---

## An Overview of the Client Application

The front end of ClimateHero was designed to be a convenient and safe means for users to interact with the server and its data, and in doing so, hopefully motivating them to reduce their carbon footprints in their daily lives. Its target user group is current employees at SAP.

## Technologies Used

The frontend is a [Single Page Application](https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58) built mainly using [React](https://reactjs.org/docs/getting-started.html), while in-app states are managed using [React-Redux](https://react-redux.js.org/introduction/quick-start). Thus, a good grasp of the two technologies will go a long way towards contributing to this project. The application is hosted on the SAP Cloud Platform, via the [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html).

On a more detailed note, the application uses the following libraries/packages:

-   [@ui5/webcomponents-react](https://sap.github.io/ui5-webcomponents-react/?path=/docs/1-welcome-getting-started--page) - UI component library with SAP-compliant styles.
-   [axios](https://github.com/axios/axios) - sending and receiving data from the server via XMLHttpRequests.
-   [moment](https://momentjs.com/) - management of date and time within the client.
-   [prettier](https://prettier.io/) - code formatting.
-   [react-datepicker](https://reactdatepicker.com/) - self-explanatory, preferred over its UI5 counterpart due to ease of use.
-   [react-time-picker](http://projects.wojtekmaj.pl/react-time-picker/) - as above.
-   [redux-logger](https://github.com/LogRocket/redux-logger) - enables in-browser logging of redux state changes.
-   [redux-thunks](https://github.com/reduxjs/redux-thunk) - Thunk middleware for Redux. Learn about thunks [here](https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60).

(The list above is non-exhaustive - some common/axiomatic libraries, such as "react" or "lodash", have been omitted for brevity)

## An Overview of the File Structure

Currently the file/folder structure looks roughly like this:

```text
/cf
    /build (the build directory which CF will deploy with. More information in the "Deployment" section below)
    ... some config files
/docs (markdown documentation files)
/public
/src
    /Assets
    /Components (React components)
    /constants (app-wide constants)
    /Pages
    /redux
    /util (common utilities)
/website (docusaurus-related files)
.eslintrc.json
.gitignore
manifest.yml
package.json
xs-security.json (app security configs)
```

## Application Architecture

Broadly speaking, the application consists of two parts - the Redux state machine and the React view layer, with a one-way data flow from the former to the latter - true to the [React Core Principles](https://reactjs.org/docs/thinking-in-react.html). More specifically, the application models Facebook's client-side web application architecture, [Flux](https://facebook.github.io/flux/docs/in-depth-overview). A high-level view is shown below:

![Flux Architecture Digram](/docs/assets/diagrams/flux_diagram.png)

> Do note that Redux, while inspired by the Flux architecture, omits the _dispatcher_ entirely. However, it is inspired by, and _"...is true to the Flux Architecture, but makes it simpler thanks to pure functions."_
>
> Find out more [here](https://redux.js.org/introduction/prior-art#flux).

We now move on to discuss each component in further detail, with the exception of the _dispatcher_.

### Store

There are 4 main objects that represent and comprise the application state are Activities, Goals, Series and Users, which constitute the Redux _store_.

#### Activities

_Activities_ are environmentally friendly alternatives to everyday tasks, such as transportation and meals, which will result in a reduction of their carbon footprint. At present, we limit _Activities_ to pertain to work-related tasks of users. There are currently 4 types of _Activities_:

1. Commute to work by bicycle (COMMUTE_BIKE)
2. Commute to work by train (COMMUTE_TRAIN)
3. Commute to work by bus (COMMUTE_BUS)
4. Have a vegetarian meal (MEAL_VEGETARIAN)

#### Series

_Series_ are essentially a representation of recurring _activities_ (e.g. daily vegetarian lunches). In its current implementation, _series_ are loosely coupled to _activities_. More concretely, the _series_ class is merely **associated** with the _activity_ class via the `seriesId` attribute of _activities_, while not resorting to **composition** or **aggregation**.

> Learn more about association, composition and aggregation [here](https://www.guru99.com/association-aggregation-composition-difference.html)

#### Goals

_Goals_ are user-defined targets which represent the user's intention to fulfill a set `measurement` of a particular type of _activity_ within a specific time period (e.g. Eat 20 vegetarian meals in the month of March 2020).

#### Users

A _User_ object is a representation of the application's user.

Here is a UML class diagram demonstrating its attributes and associations with the other classes:

![UML Class Diagram](/docs/assets/diagrams/state_class.png)

> If we were to take a leaf from the popular [MVC framework](https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm), the above would roughly translate to repesentation of the "Model".

### Action

For each of the 4 object classes constituting the store, either some or all of the following 4 action types are available: `ADD`, `EDIT`, `DELETE`, and `FETCH` (e.g. `ADD_ACTIVITY`). Each of these action types are further split into 3 stages: `START`, `SUCCESS` and `FAIL` (e.g. `ADD_ACTIVITY_START`). Furthermore, Modals have `TOGGLE` actions associated with them, while Users are associated with the `LOGIN` and `LOGOUT` actions. Currently, there are a total of **41** action types in the application.

#### Activity-related

1. `ADD_ACTIVITY_STARTED` - A call to add an _activity_ is made to the server.
2. `ADD_ACTIVITY_SUCCESS` - An _activity_ is successfully added to the server database.
3. `ADD_ACTIVITY_FAIL` - An _activity_ fails to be added to the server database.
4. `DELETE_ACTIVITY_STARTED` - A call to delete an _activity_ is made to the server.
5. `DELETE_ACTIVITY_SUCCESS` - An _activity_ is successfully deleted from the server database.
6. `DELETE_ACTIVITY_FAIL` - An _activity_ fails to be deleted from the server database.
7. `EDIT_ACTIVITY_STARTED` - A call to edit an _activity_ is made to the server.
8. `EDIT_ACTIVITY_SUCCESS` - An _activity_ is successfully edited in the server database.
9. `EDIT_ACTIVITY_FAIL` - An _activity_ fails to be edited in the server database.
10. `FETCH_ACTIVITIES_STARTED` - A call to fetch a number of _activities_ is made to the server database.
11. `FETCH_ACTIVITIES_SUCCESS` - A number of _activities_ is successfully fetched from the server database.
12. `FETCH_ACTIVITIES_FAIL` - A number of _activities_ fails to be fetched from the server database.

#### Goal-related

1.  `ADD_GOAL_STARTED` - A call to add a _goal_ is made to the server.
2.  `ADD_GOAL_SUCCESS` - A _goal_ is successfully added to the server database.
3.  `ADD_GOAL_FAIL` - A _goal_ fails to be added to the server database.
4.  `DELETE_GOAL_STARTED` - A call to delete a _goal_ is made to the server.
5.  `DELETE_GOAL_SUCCESS` - A _goal_ is successfully deleted from the server database.
6.  `DELETE_GOAL_FAIL` - A _goal_ fails to be deleted from the server database.
7.  `EDIT_GOAL_STARTED` - A call to edit a _goal_ is made to the server.
8.  `EDIT_GOAL_SUCCESS` - A _goal_ is successfully edited in the server database.
9.  `EDIT_GOAL_FAIL` - A _goal_ fails to be edited in the server database.
10. `FETCH_GOALS_STARTED` - A call to fetch a number of _goals_ is made to the server database.
11. `FETCH_GOALS_SUCCESS` - A number of _goals_ is successfully fetched from the server database.
12. `FETCH_GOALS_FAIL` - A number of _goals_ fails to be fetched from the server database.

#### Series-related

25. `ADD_SERIES_STARTED` - A call to add a _series_ is made to the server.
26. `ADD_SERIES_SUCCESS` - A _series_ is successfully added to the server database.
27. `ADD_SERIES_FAIL` - A _series_ fails to be added to the server database.
28. `DELETE_SERIES_STARTED` - A call to delete a _series_ is made to the server.
29. `DELETE_SERIES_SUCCESS` - A _series_ is successfully deleted from the server database.
30. `DELETE_SERIES_FAIL` - A _series_ fails to be deleted from the server database.
31. `FETCH_SERIES_STARTED` - A call to fetch a number of _series_ is made to the server database.
32. `FETCH_SERIES_SUCCESS` - A number of _series_ is successfully fetched from the server database.
33. `FETCH_SERIES_FAIL` - A number of _series_ fails to be fetched from the server database.

#### UI-related

34. `TOGGLE_WELCOME_MODAL` - Toggles the display of welcome modal.
35. `TOGGLE_ADD_ACTIVITY_MODAL` - Toggles the display of modal for adding activites.
36. `TOGGLE_EDIT_ACTIVITY_MODAL` - Toggles display of the modal for editting activites.
37. `TOGGLE_ADD_GOAL_MODAL` - Toggles the display of modal for adding _goals_.
38. `TOGGLE_EDIT_GOAL_MODAL` - Toggles the display of modal for editting _goals_.
39. `TOGGLE_ADD_SERIES_MODAL` - Toggles the display of modal for adding _series_.

#### User-related

40. `USER_LOGIN` - Dispatched when the user logs into the application.
41. `USER_LOGOUT` - Dispatched when the user logs out of the application.

### View

This is what our React component tree roughly looks like:

![Component Tree Diagram](/docs/assets/diagrams/component_tree.png)

## Current State of Development

As of 1 May 2020, the application is in its MVP ([Minimum Viable Product](https://en.wikipedia.org/wiki/Minimum_viable_product)) stage. All of the actions described above are available to users in a controlled and safe manner, allowing them to track their carbon reductions in a simple and effective way.

## Future Improvements

The following are some recommendations for the further development of the application, in order of priority.

### Testing

At present, theres is little to no automated testing scripts. It is highly recommended that unit and integration tests be set-up before the application is deployed into production. To this end, two popular and recommended testing frameworks are [Jest](https://jestjs.io/) and [Mocha](https://mochajs.org/).

### Enhancing User-related Functionalities

Up until now, our development focus has been largely centred on fleshing out the main functionalities - the adding, editing, deleting and fetching of _activities_ and _goals_. With these features having working implementations, and with the authorization for the application now up and running (as of 22 April 2020), there is ample headroom for the development of more user-specific features. Here are a few suggestions:

#### Tailored Recommendations Based on User's Activity History

Recommendations can be made to users as to which types of _activities_ they should be doing more of. Consequently, recommended _goals_ may be generated for the user to accept at the click of a button.

##### Suggested Approach

Conditional scripts, or more more ambitiously, machine learning algorithms.

### Enabling Social Aspects

One of the initial inspirations for ClimateHero was the [Fit@SAP](https://fiorilaunchpad.sap.com/sites#fitsap-Display) application, which has various social aspects to it, from allowing users to join fitness groups to sharing custom fitness challenges with colleagues. In a similar fashion, ClimateHero ultimately aims to utilize social aspects as a motivator for SAP employees to become more environmentally conscious and to reduce their carboon footprints. Below are a few suggestions as to how this might be achieved:

#### Sharing of goals

Allow users to share and receive goals with other users.

_Prerequisites_: Some form of social network graph which connects users and user groups must be established prior.

##### [Use case #1: Sharing of goals](#use-case-1-sharing-of-goals)

1. User logs into the ClimateHero App
2. User clicks on a particular goal in the GoalsCard
3. User clicks "Share" button
4. A checklist of the user's colleagues/working groups appears
5. User checks options as is appropriate
    > Consider limiting number of checked user/groups to prevent spam
6. Goal is sent to the selected users

##### Use case #2: Receiving of goals

1. User logs into the ClimateHero App
2. User receives a pop-up modal, containing a descriptive receipt of shared goal(s), as well as the option to "Add to My Goals" or "Ignore".
3. The goal is added or discarded accordingly.

##### Suggested Approach

1. Create a new _Notification_ class, with enumerated types.
   Some suggested class types:
    - NOTIFICATION_GOAL_SHARED for incoming shared goals. For instance, "John Newton has shared the following goal with you...".
    - NOTIFICATION_GOAL_RECOMMENDED for recommended goals from the server. For instance, "Hey! We see you haven't been... Would you like to set a goal to...?"
2. Enable notification creators which can either be user-triggered, such as via [Use Case #1](#use-case-1-sharing-of-goalsuse-case-1-sharing-of-goals), or automatically triggered by the backend, such as in the case of recommendations made by the application (server).
3. Add a new attribute to the existing User schema: a list of incoming notifications which have yet to be dismissed by the User, to be rendered in a popup modal whenever the user first logs in, or according to a set time interval.

## Deployment

> You need to be authenticated with the appropriate SAP Cloud Platform organisation/space to perform the following successfully.

As mentioned at the beginning of the page, ClimateHero is hosted on the SAP Cloud Platform, via the Cloud Foundry CLI. To deploy an updated version of the application, there are roughly 2 steps.

### 1. Build the application

This is done by running the following npm script:

```bash
npm run buildCF (Mac/Linux)
npm run buildCFWindows (Windows)
```

The above two commands are custom npm scripts which translate into the following respectively:

```bash
react-scripts build && rm -rf ./cf/build && mv ./build ./cf/build
react-scripts build && DEL /F/Q/S cf\\build > NUL && RMDIR /Q/S cf\\build && move build cf\\
```

### 2. Push the application

```bash
cf push
```

The above command will push the application to the cloud, adopting its configurations from the `manifest.yml` file. More information on how to configure the manifest attributes can be found [here](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html).

Happy hacking!
