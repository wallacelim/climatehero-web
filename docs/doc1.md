---
id: doc1
title: Documentation for the Web Application (Front End)
sidebar_label: Web Application
---

## Prerequisites for contributing

The frontend is built mainly using React, while in-app states are managed using React-Redux. Thus, a good grasp of the two technologies will go a long way towards contributing to this project. The application is hosted on the SAP Cloud Platform, via the Cloud Foundry CLI.

#### Some Relevant Resources:
##### React
[Tutorial](https://reactjs.org/tutorial/tutorial.html)  
[Getting Started](https://reactjs.org/docs/getting-started.html)  
##### (React-)Redux
[Tutorial](https://redux.js.org/basics/basic-tutorial)  
[Getting Started](https://react-redux.js.org/introduction/quick-start) 
##### Cloud Foundry (CLI)
[Installation Guide](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) 

## An overview of the file structure
Currently the file/folder structure looks roughly like this:
```
/cf 
    /build (the build directory which CF will deploy with. More information [below].)
/docs
/public
/src
    /Assets
    /Components
    /constants
    /Pages
    /redux
    /util
/website
.eslintrc.json
.gitignore
manifest.yml
package.json
xs-security.json
```


## Nulla

Nulla facilisi. Maecenas sodales nec purus eget posuere. Sed sapien quam, pretium a risus in, porttitor dapibus erat. Sed sit amet fringilla ipsum, eget iaculis augue. Integer sollicitudin tortor quis ultricies aliquam. Suspendisse fringilla nunc in tellus cursus, at placerat tellus scelerisque. Sed tempus elit a sollicitudin rhoncus. Nulla facilisi. Morbi nec dolor dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras et aliquet lectus. Pellentesque sit amet eros nisi. Quisque ac sapien in sapien congue accumsan. Nullam in posuere ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin lacinia leo a nibh fringilla pharetra.

## Orci

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin venenatis lectus dui, vel ultrices ante bibendum hendrerit. Aenean egestas feugiat dui id hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur in tellus laoreet, eleifend nunc id, viverra leo. Proin vulputate non dolor vel vulputate. Curabitur pretium lobortis felis, sit amet finibus lorem suscipit ut. Sed non mollis risus. Duis sagittis, mi in euismod tincidunt, nunc mauris vestibulum urna, at euismod est elit quis erat. Phasellus accumsan vitae neque eu placerat. In elementum arcu nec tellus imperdiet, eget maximus nulla sodales. Curabitur eu sapien eget nisl sodales fermentum.

## [Deployment][Deployment]

As mentioned at the beginning of the page, ClimateHero is hosted on the SAP Cloud Platform, via the Cloud Foundry CLI. To deploy an updated version of the application, there are roughly 2 steps.

###### 1. Build the application
This is done by running the npm script:
```
npm run buildCF (Mac/Linux)
npm run buildCFWindows (Windows)
```
The above two commands are custom npm scripts which translate into the following respectively:
```
react-scripts build && rm -rf ./cf/build && mv ./build ./cf/build
react-scripts build && DEL /F/Q/S cf\\build > NUL && RMDIR /Q/S cf\\build && move build cf\\
```
##### 2. Push the application
```
cf push
```
The above command will push the application to the cloud, adopting its configurations from the ```manifest.yml``` file. More information on how to configure the manifest attributes can be found [here](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html).