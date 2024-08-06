import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import "./sass/homepage.scss";
import Navbar from "./components/Navbar";
import useApp from "./hooks/useApp";


export default function App() {
  const { initlize } = useApp()
  useEffect(() => { initlize() }, [])

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
