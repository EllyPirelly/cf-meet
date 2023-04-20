# Meet App

### What is this about?
A serverless, progressive web application with React using a TDD approach. The application uses the Google Calendar API to fetch upcoming events.
<br>
This PWA has been built as a task for Achievement 4 in [Career Foundry's Full-Stack Web Development Program](https://careerfoundry.com/en/courses/become-a-web-developer/).

### Technical requirements
- the Meet App
  - must be a React application
  - must be build using TDD
  - must use the Google Calendar API and OAuth2 for authentication
    - Google Calendar provided by CareerFoundry, will be populated with events
  - must use serverless functions (AWS lambda) for authorization
  - must be responsive (320px ... 1920px)
  - must support latest browser versions and IE11
  - must pass the [lighthouse check](https://developer.chrome.com/docs/lighthouse/overview/)
  - must work offline or in slow networks with the help of a service worker
  - must enable a user to install the app on desktop, add the app to their home screen on mobile
  - must be hosted on GitHub, deployed on GitHub Pages
  - must use React Axios and async/await
  - must have an alert system implemented, using an OOP approach
  - must make use of data visualization
  - must have a test coverage rate >= 90%
  - must be monitored using an online monitoring tool

### Features
With this Meet APP, the user is able to
- filter events by city name
- specify the number of events shown
- show/hide event details
- use the app when offline
- add an app shortcut to the home screen
- view a chart showing the number of upcoming events by city

### Languages, Libraries, Frameworks, Tools
- HTML
- CSS
- JavaScript

### Dependencies
- `react` via `react-create-app` and all packages coming with it

### Dev Dependencies
- `gh-pages`
  - to host the project on GitHub Pages
  - for that also this is needed in the `package.json`
    - `"homepage": "https://ellypirelly.github.io/cf-meet",`
    - `"deploy": "gh-pages -d build"`
  -

### How to run this?
- clone the repo
- `cd` into project
- `npm install`
- run to start the server
  - `npm run start`
  - this is going to start a local server on `http://localhost:3000/`
- run to deploy the project to the `gh-pages` branch
  - `npm run deploy`
- run to predeploy the project
  - `"predeploy": "npm run build",`
  - is necessary as sometimes the `build` folder does not contain the latest changes from the app
  - as you most likely want the latest build deployed on GitHub Pages, running this might come in handy