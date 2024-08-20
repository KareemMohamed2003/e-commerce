import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import useApp from "./hooks/useApp";
import "./App.css";
import "./sass/homepage.scss";
import { useSelector } from "react-redux";

export default function App() {
  const { initialize } = useApp();
  const transactionMessage = useSelector(
    (state: any) => state.cartState.message,
  );
  console.log("transaction message app.tsx", transactionMessage)
  useEffect(() => {
    initialize();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <section className="featured-products">
        <Outlet />
      </section>
    </div>
  );
}
