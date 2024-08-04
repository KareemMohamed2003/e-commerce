import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./Redux/productsSlice";
import { displayFeaturedProducts } from "./Redux/featuredProductsSlice";
import "./App.css";
import "./sass/homepage.scss";
// import UseInitializeApp from "./hooks/UseLogin";
import { signOut } from "./Redux/userDataSlice";
import { reduxPersistor, store } from "./Redux/reduxStore";
import { Dispatch } from "redux";

export default function App() {
  const currentUser = useSelector((state: any) => state.user);
  // const { } = UseInitializeApp();
  console.log(localStorage.length);
  console.log(new Blob(Object.values(localStorage)).size);
  var localStorageSpace = function () {
    var allStrings = "";
    for (var key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        allStrings += window.localStorage[key];
      }
    }
    return allStrings
      ? 3 + (allStrings.length * 16) / (8 * 1024) + " KB"
      : "Empty (0 KB)";
  };
  console.log("local storage space", localStorageSpace());
  console.log(currentUser);
  const dispatch: Dispatch = useDispatch();
  const getProducts = async () => {
    const get = await fetch(
      `https://admin-dashboard-f3c0a-default-rtdb.firebaseio.com/products.json`,
    );
    const data = await get.json();
    // console.log(data)
    dispatch(getData({ data }));
    dispatch(displayFeaturedProducts({ data }));
  };
  // dispatch(signOut())
  console.log(": app");
  useEffect(() => {
    getProducts();
  }, []);

  fetch(
    `https://admin-dashboard-f3c0a-default-rtdb.firebaseio.com/products.json`,
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      // dispatch(getData({ data }));
      // dispatch(displayFeaturedProducts({ data }));
    });

  console.log("app");

  return (
    <div className="App">
      <Navbar />
      {/* // display loader */}
      <section className="featured-products">
        <Outlet />
      </section>
    </div>
  );
}
