import React from "react"
import ReactDOM from "react-dom"
import App from "./pages/App"
import { Provider } from 'react-redux'
import store from './store/configureStore'

let runningInDevelopment = process.env.NODE_ENV === "development";
console.log("Current React Environment: " + process.env.NODE_ENV);

if (!runningInDevelopment && (!localStorage.getItem("accessToken") || !localStorage.getItem("user"))) {
  window.location.assign('/'); //Only redirect to SSO when accessing 'app/index.html' directly and we're not currently running under 'npm starthttps'
}
else {

  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
    document.getElementById("root"))
}