import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../src/store/store.js";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useParams } from 'react-router-dom'
import Layout from "./Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import AddInfo from "./components/AddInfo/AddInfo.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path="" element={<HomePage/>}/>
      <Route path="addInfo" element={<AddInfo/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
      </React.StrictMode>
  </Provider>
);
