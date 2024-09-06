import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import useApp from './hooks/useApp';
import './App.css';
import './sass/homepage.scss';
export default function App() {
  const { initialize } = useApp();
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
