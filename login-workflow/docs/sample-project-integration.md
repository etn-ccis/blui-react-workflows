# Starting from the Example Project

If you don't have an existing React project and would like an example as a starting point, consider using the provided example project in the `/example` folder.


#### Setup

Clone or download the package [repository](https://github.com/pxblue/react-workflows) and then copy the `/example` folder to a new location. Navigate into this folder and run `yarn` to install the required dependencies.

> If you are using npm as your package manager, you can delete the yarn.lock file and run `npm install` instead. This will generate a new lock file.


#### Rename the Project

You will probably want to call your project something other than 'example'. Rename the folder to whatever you'd like your project name to be. You will also need to update the relevant project-related configuration options in the `package.json` and `index.html` files.


#### Configure AuthUIContextProvider

Open the root app file (`App.tsx`) and adjust the configuration options of the `AuthUIContextProvider` as necessary for your project. The various configuration options are explained in more detail in the [API](https://github.com/pxblue/react-workflows/tree/master/login-workflow/docs/API.md) documentation. As a suggestion, you may want to swap out the example image with a product logo for your project.


#### Implement AuthUIActions and RegistrationUIActions

In the example project, all network calls are mocked with `sleeps`. The EULA is also a static sample file.

Provide real implementation details within the `example/src/actions/AuthUIActions.tsx` and `examples/src/actions/RegistrationUIActions.tsx` files, which are currently mocking network behavior. Most likely, your implementation will involve making calls to an API and using session storage or cookies to retain information as needed by your application (such as the user's name and email).

You may also want to take this time to rename those two files, prefixing "AuthUIActions" and "RegistrationUIActions" with the name of your project. Make sure you update your imports if so.