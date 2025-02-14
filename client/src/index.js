import React from "react";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
// import { Provider } from "react-redux";
// import { store, persistor } from "./store/store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider store={store}>
  <div>
    <App />
  </div>

  // </Provider>
);
