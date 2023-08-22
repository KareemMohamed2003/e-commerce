import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./Redux/reduxStore"
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import HomePage from './pages/HomePage';
import SelectedCategory from './pages/SelectedCategory';
import LoginPage from "./pages/LoginPage"
import RegistrationPage from './pages/RegistrationPage';
const container = document.getElementById('root')!;
const root = createRoot(container);
const router = createBrowserRouter([

  {
    path: "/LoginPage",
    element:
      <Provider store={store}>
        <LoginPage />
      </Provider>
  }
  ,

  {
    path: "/RegistrationPage",
    element:
      <Provider store={store}>
        <RegistrationPage />
      </Provider>
  }, {

    path: "/",
    element:
      <Provider store={store}>
        <LoginPage />
      </Provider>
  }
  , {
    path: "/home", element:
      <Provider store={store}>
        <App />
      </Provider>,
    children: [
      { index: true, element: <HomePage /> }
      , {
        index: true,
        path: "SelectedCategory",
        element: <SelectedCategory />
      }
    ]
  },

])
root.render(
  <RouterProvider router={router} />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

