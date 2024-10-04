# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# my_fe

# Custom Application Architecture

## Overview

This application is built using the MVVM (Model-View-ViewModel) approach, enhancing testability and maintainability through dependency injection and separation of concerns.

### Architecture Details

- **MVVM Approach**:
  - Promotes a clear structure for handling UI logic and data management.
- **Dependency Injection**:
  - Facilitates easier testing and development by decoupling components.
- **Separation of Concerns through Domain-Driven Design (DDD)**:
  - **Data Layer**: Responsible for data retrieval and storage.
  - **Domain Layer**: Encapsulates the business logic of the application.
  - **View Layer**: Handles the user interface (UI) presentation.
  - **ViewModel**: Contains all the UI logic, bridging the view and the model.
  - **View**: Focused solely on rendering the UI, with no business logic included.

## Future Improvements

- **Enhance Testing**: Increase the coverage and quality of unit and integration tests.
- **Styled Components**: Refactor `quizStyles.ts` to utilize styled-components for a more streamlined styling approach.
- **User Repository Integration**: Store user results in a `UserRepo` and update the `QuestionService` to accept both `quizRepository` and `userRepository` as dependencies.
