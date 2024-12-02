# auth0-cypress-sample

This repository contains a working example of how to handle Cypress tests, when your application uses Auth0. 

## Prerequisites

* Node 18 or greater, aligning with Cypress' prequirements as well.
* Having a test base in place: This example is using the [Demo App](https://github.com/oktadev/devday-24-labs-demo-app) of [Dev_day 2024](https://developerday.com). Of course you can use your own application. However, this will make it mandatory to customize the tests to fit your application.
* Your favorite IDE
* A web browser with good debugging capabilities
* Terminal window

## Getting Started

To run this example, run the following commands:

```
git clone https://github.com/oktadev/okta-angular-standalone-runtime-config-example.git
```

```
cd okta-angular-standalone-runtime-config-example
```

```
* npm install
```

That's it! After that, you're able to run Cypress' testrunner, for example by using this command:

```
npx cypress open
```

You can run it headlessly too, please refer to [Cypress' documentation](https://docs.cypress.io/app/get-started/open-the-app) to see all available options.
