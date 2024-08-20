import { useDispatch } from "react-redux";
import { getData } from "../Redux/productsSlice";
import { displayFeaturedProducts } from "../Redux/featuredProductsSlice";
import { eCommerceDB, readFromDB } from "../lib/firebase";
export default function useApp() {
  const dispatch = useDispatch();
  const initialize = async () => {
    const products = await readFromDB("/products", eCommerceDB)
    dispatch(getData({ products }));
    dispatch(displayFeaturedProducts({ products }));
  };
  return { initialize };
}
