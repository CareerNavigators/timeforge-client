import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <header class="inverted">
      <h2>CKEditor 5 Classic in React</h2>
      <p></p>
    </header>
    <App />
    <section class="inverted">
      <p>Edit <code>src/App.js</code> and save to reload.</p>
      <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/react.html#component-properties">See docs</a>
    </section>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

