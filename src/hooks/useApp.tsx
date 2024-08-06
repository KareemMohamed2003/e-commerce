import { useDispatch } from "react-redux";
import { getData } from "../Redux/productsSlice";
import { displayFeaturedProducts } from "../Redux/featuredProductsSlice";
export default function useApp() {
   const dispatch = useDispatch();
   const initlize = async () => {
      const products = await fetch(
         `https://admin-dashboard-f3c0a-default-rtdb.firebaseio.com/products.json`,
      );
      const data = await products.json();
      // const
      console.log(data)
      dispatch(getData({ data }));
      dispatch(displayFeaturedProducts({ data }));
   }

   return { initlize }

}