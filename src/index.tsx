import { loader as appLoader } from "./lib/loaders/appLoader";
import { loader as loginLoader } from "./lib/loaders/loginLoader";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/reduxStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectedCategory from "./pages/SelectedCategory";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import SelectedProduct from "./pages/SelectedProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import RouteError from "./components/RouteError";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/CartPage";
import App from "./App";
import "./index.css";
import "./App.css"
import { StrictMode } from "react";
import Loader from "./components/Loader";
const container = document.getElementById("root")!;
const root = createRoot(container);
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
        element: <LoginPage />
      },

      {
        path: "/RegistrationPage",
        element: <RegistrationPage />,
      },

      {
        path: "/",
        loader: appLoader,
        errorElement: <RouteError />,

      },

      {
        path: "/home",

        element: <App />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "products/",
            element: <SelectedProduct />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            index: true,
            path: "SelectedCategory/:category",
            element: <SelectedCategory />,
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
  <StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={
        <section className="appLoader">
          <Loader />
        </section>
      }
    />
  </StrictMode>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
