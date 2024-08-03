import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/reduxStore";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectedCategory from "./pages/SelectedCategory";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AuthProvider from "./components/ProtectedRoute";
import { loader as appLoader } from "./appLoader";
import RouteError from "./components/RouteError";
import { onAuthStateChanged } from "firebase/auth";
import { eCommerceAuth } from "./firebase";
import { getCart } from "./Redux/cartSlice";
import { setUserSlice } from "./Redux/userDataSlice";


const container = document.getElementById("root")!;
const root = createRoot(container);
const user = eCommerceAuth
console.log(user)
onAuthStateChanged(eCommerceAuth, async (user) => {
  console.log(user)
})
//   if (user) {)
console.log("index page");
// console.log(eCommerceAuth.currentUser)
// eCommerceAuth.se
// onAuthStateChanged(eCommerceAuth, async (user) => {
//   if (user) {
//     console.log(user)

//     const userId = user.uid;
//     console.log("getIdToken", user.getIdToken())
//     console.log("getIdTokenResult", user.getIdTokenResult())
//     const userDataQuery = await fetch(
//       `https://e-commerce-cbe7c-default-rtdb.firebaseio.com/users/${userId}.json`,
//     );
//     const queryRes = await userDataQuery.json();
//     store.dispatch(getCart(queryRes.cart)); // this would only fetch the user Cart when the user  logs in
//     const userInfo = { ...queryRes, userId };
//     console.log(queryRes);
//     store.dispatch(setUserSlice({ userInfo }));
//     return user
//   }

// })

const router = createBrowserRouter([
  {
    path: "/LoginPage",
    errorElement: <RouteError />,
    loader: appLoader,
    // here we check if the user is logged in 
    // loader: async ({ request }) => {
    //   // const isLogged = true;
    //   // if (isLogged) {
    //   //   console.log(request)
    //   //   return redirect("/home")
    //   // }
    //   return null
    // },
    element: (
      <Provider store={store}>
        <LoginPage />
      </Provider>
    ),
  },

  {
    path: "/RegistrationPage",
    errorElement: <div>oops something went wrong</div>,
    element: (
      <Provider store={store}>
        <RegistrationPage />
      </Provider>
    ),
  },
  {
    path: "/"
    ,
    // loader: async ({ request }) => {

    // },
    // }
    // ,
    // loader: () => {
    //   return redirect("/home")
    // },
    element: (
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    ),
    errorElement: <RouteError />,

    children: [
      {

        path: "home",
        element: (
          <Provider store={store}>
            <AuthProvider>
              <HomePage />
            </AuthProvider>
          </Provider>
        ),
        children: [
          { index: true, element: <HomePage /> },
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
    fallbackElement={<div>i hate routers</div>}
  />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
