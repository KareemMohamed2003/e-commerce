import  { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './Redux/productsSlice';
import { displayFeaturedProducts } from "./Redux/featuredProductsSlice";
import './App.css';
import "./sass/homepage.scss";

export default function App() {
  const currentUser = useSelector(((state: any) => state.user))
  const navigate = useNavigate();
  const getProducts = async () => {
    const get = await fetch(`https://admin-dashboard-f3c0a-default-rtdb.firebaseio.com/products.json`)
    const data = await get.json()
    // console.log(data)
    dispatch(getData({ data }))
    dispatch(displayFeaturedProducts({ data }))

  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.userId) navigate("/", { replace: true })
    getProducts()

  }, [])

 
  return (

    <div className="App">
      <Navbar />

      <section className='featured-products'>
        <Outlet />
      </section>

    </div>

  );

}

