import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import store from "./store"
var plural = require('pluralize')

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.replace(/\b\w/g, l => l.toUpperCase());
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'pluralize', {
  value: function() {
    return plural(this);
  },
  enumerable: false
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
