import { getAuth } from 'firebase/auth';
import { useReducer, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserEntry } from '../lib/cartActions';
import { reduxPersistor } from '../Redux/reduxStore';
import { resetFeaturedProducts } from '../Redux/featuredProductsSlice';
import { resetCart } from '../Redux/cartSlice';
import { signOut } from '../Redux/userDataSlice';
import { resetProducts } from '../Redux/productsSlice';
import { resetSelectedProducts } from '../Redux/SelectedCategorySlice';
import { displayReducer, initialState } from '../lib/reducers/navReducer';
import { toArray } from '../lib/helpers';
import { useAppSelector } from '../Redux/hooks';
import { SearchMenu } from '../types';
export default function useNavbar() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useAppSelector((state) => state.cartState.cart?.length);
  const cartState = useAppSelector((state) => state.cartState);
  const userData = useAppSelector((state) => state.user);
  const productsState = useAppSelector((state) => state);
  const [productsArr, setProducts] = useState<any[]>([]);
  const [toggleMenu, setMenuToggle] = useState(false);
  const [searchResults, setSearchResults] = useState<[] | null>(null);
  const [searchMenu, setSearchMenu] = useState<SearchMenu>({
    compact: false,
    fullScreen: false,
    toggle: false,
  });
  const [notificationDisplay, dispatchReducer]: any = useReducer<any>(
    displayReducer,
    initialState
  );

  useEffect(() => {
    const products = productsState.products.products;
    products && setProducts(toArray(products));
  }, [productsState]);

  useEffect(() => {
    if (cartState.checkout) {
      dispatchReducer({ type: 'displayCartNotification' });
    }
    if (cartState.isItemChanged) {
      dispatchReducer({ type: 'displayCartNotification' });
    } else if (!cartState.isItemPending) {
      dispatchReducer({ type: 'disableCartNotification' });
    }
  }, [cartState]);

  const logOut = async (userData: any, eCommerceDB: any) => {
    addUserEntry('checkOut', userData, eCommerceDB);
    dispatch(resetCart());
    dispatch(signOut());
    dispatch(resetProducts());
    dispatch(resetFeaturedProducts());
    dispatch(resetSelectedProducts());
    await auth.signOut();
    await reduxPersistor.purge();
    navigate('/LoginPage', { replace: true });
  };
  return {
    toggleMenu,
    notificationDisplay,
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
