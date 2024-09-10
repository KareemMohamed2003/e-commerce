import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserEntry } from '../lib/cartActions';
import { reduxPersistor } from '../Redux/reduxStore';
import { resetFeaturedProducts } from '../Redux/featuredProductsSlice';
import { resetCart } from '../Redux/cartSlice';
import { signOut } from '../Redux/userDataSlice';
import { resetProducts } from '../Redux/productsSlice';
import { resetSelectedProducts } from '../Redux/SelectedCategorySlice';
import { toArray } from '../lib/helpers';
import { useAppSelector } from '../Redux/hooks';
import { ProductProps, SearchMenu, userCredentials } from '../types';
import { Database } from 'firebase/database';

export default function useNavbar() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useAppSelector((state) => state.cartState.cart?.length);
  const cartState = useAppSelector((state) => state.cartState);
  const userData = useAppSelector((state) => state.user);
  const productsState = useAppSelector((state) => state);
  const [productsArr, setProducts] = useState<ProductProps[]>([]);
  const [toggleMenu, setMenuToggle] = useState(false);
  const [searchResults, setSearchResults] = useState<ProductProps[] | null>(null);
  const [searchMenu, setSearchMenu] = useState<SearchMenu>({
    compact: false,
    fullScreen: false,
    toggle: false,
  });


  const [cartNotification, setCartNotification] = useState<boolean>(false)
  useEffect(() => {
    const products = productsState.products.products;
    products && setProducts(toArray(products));
  }, [productsState]);

  useEffect(() => {
    if (cartState.checkout) {
      setCartNotification(true)

    }
    if (cartState.isItemChanged) {
      setCartNotification(true)

    } else if (!cartState.isItemPending) {
      setCartNotification(false)

    }

  }, [cartState]);

  const logOut = async (userData: userCredentials, eCommerceDB: Database) => {
    addUserEntry('checkOut', userData, eCommerceDB);
    dispatch(resetCart());
    dispatch(signOut());
    dispatch(resetProducts());
    dispatch(resetFeaturedProducts());
    dispatch(resetSelectedProducts());
    await reduxPersistor.purge();
    await auth.signOut();
    navigate('/LoginPage', { replace: true });
  };
  return {
    toggleMenu,
    cartNotification,
    dispatch,
    setMenuToggle,
    navigate,
    logOut,
    productsState,
    cartCount,
    setSearchResults,
    searchResults,
    userData,
    productsArr,
    setSearchMenu,
    searchMenu,
  };
}
