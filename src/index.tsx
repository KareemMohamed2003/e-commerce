import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import SelectedCategory from "./pages/SelectedCategory";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RouteError from "./components/RouteError";
import { loader as appLoader } from "./appLoader";
import { loader as loginLoader } from "./loginLoader";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/reduxStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
const container = document.getElementById("root")!;
const root = createRoot(container);
console.log("index page");
const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: (
      <Provider store={store}>
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </Provider>
    ),

    children: [
      {
        path: "/LoginPage",
        errorElement: <RouteError />,
        loader: loginLoader,
        element: <LoginPage />,
      },

      {
        path: "/RegistrationPage",
        errorElement: <div>oops something went wrong</div>,
        element: <RegistrationPage />,
      },
      {
        path: "/",
        loader: appLoader,

        errorElement: <RouteError />,
      },
      {
        path: "/home",
        // loader: appLoader,
        element: <App />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            index: true,
            path: "SelectedCategory",
            element: <SelectedCategory />,
          },
        ],
      },
    ],
  },
]);
root.render(
  <RouterProvider
    router={router}
  // fallbackElement={<div><h1>loading...
  // </h1></div>}
  />,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
