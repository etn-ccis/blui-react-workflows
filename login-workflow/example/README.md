This project is a sample that demonstrates how to use [@brightlayer-ui/react-auth-workflow](https://www.npmjs.com/package/@brightlayer-ui/react-auth-workflow). It includes a sample Home screen with buttons to log out and change password. If the user is not authenticated, he/she will be presented with the authentication workflow with screens for Log In, Forgot Password, Support, and Registration.

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project now includes an Okta login screen for authentication. To use the Okta login screen, you need to configure your Okta application and update the environment variables in your project.

## Okta Configuration

1. Create an application in Okta.
2. Update the `.env` file in your project directory with the following variables:
    ```
    REACT_APP_OKTA_CLIENT_ID=<your-okta-client-id>
    REACT_APP_OKTA_ISSUER=<your-okta-issuer-url>
    ```
**Note: The Okta login screen will be automatically presented to the user if they are not authenticated. The user can log in using their Okta credentials. Once authenticated, they will be redirected to the Home screen.**

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
