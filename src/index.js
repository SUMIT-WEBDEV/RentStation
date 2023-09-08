import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./Authentications/context/AuthContext";
// import './index.css';
import Main from "./Main";
import reducer from "./reducer";
import { StateProvider, initialState } from "./StateProvider";
// import { AuthContextProvider } from "./MyComponents/Authentication/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Main />
      </StateProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
