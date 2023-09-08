// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   useState,
// } from "react";
// import axios from "axios";

// // Prepares the dataLayer
// export const StateContext = createContext();

// // Wrap our app and provide the Data layer
// export const StateProvider = ({ reducer, initialState, children }) => {
//   const [loggedIn, setLoggedIn] = useState(undefined);

//   async function getLoggedIn() {
//     const loggedInRes = await axios.get("http://localhost:4000/auth/register");
//     // const loggedInRes = await axios.get(
//     //   "https://mern-auth-template-tutorial.herokuapp.com/auth/loggedIn"
//     // );
//     setLoggedIn(loggedInRes.data);
//   }

//   useEffect(() => {
//     getLoggedIn();
//   }, []);

//   return (
//     <StateContext.Provider
//       value={useReducer(reducer, initialState, loggedIn, getLoggedIn)}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// // Pull information from the data layer
// export const useStateValue = () => useContext(StateContext);

import React, { createContext, useContext, useEffect, useReducer } from "react";
// import reducer from "./reducer";

export const initialState = {
  basket: localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket"))
    : [],
};

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);

// initialstate = basket

//or
// import React, { createContext, useContext, useEffect, useReducer } from "react";

// export const initialState = {
//   basket: localStorage.getItem("basket")
//     ? JSON.parse(localStorage.getItem("basket"))
//     : [],
// };

// export const StateContext = createContext();

// export const StateProvider = ({ reducer, initialState, children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <StateContext.Provider value={{ state, dispatch }}>
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateValue = () => useContext(StateContext);
