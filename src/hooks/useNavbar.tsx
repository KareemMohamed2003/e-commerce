import { getAuth } from "firebase/auth";
import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserEntry } from "../lib/cartActions";
import { reduxPersistor } from "../Redux/reduxStore";
import { resetFeaturedProducts } from "../Redux/featuredProductsSlice";
import { resetCart } from "../Redux/cartSlice";
import { signOut } from "../Redux/userDataSlice";
import { resetProducts } from "../Redux/productsSlice";
import { resetSelectedProducts } from "../Redux/SelectedCategorySlice";
import { displayReducer, initialState } from "../lib/reducers/navReducer";

export default function useNavbar() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state: any) => state.cartState.cart?.length);
  const cartState = useSelector((state: any) => state.cartState);
  const userData = useSelector((state: any) => state.user);
  const productsState = useSelector((state: any) => state);
  const [toggleMenu, setMenuToggle] = useState(false);
  const [notificationDisplay, dispatchReducer]: any = useReducer<any>(
    displayReducer,
    initialState,
  );
  useEffect(() => {
    if (cartState.checkout) {
      console.log("cartState.checkout");
      dispatchReducer({ type: "displayCartNotification" });
    }
    if (cartState.isItemChanged) {
      console.log("cartState.isItemChanged");
      dispatchReducer({ type: "displayCartNotification" });
    } else if (!cartState.isItemPending) {
      console.log("!cartState.isItemPending");
      // this prevents the checkout notification from getting to the checkout expression
      dispatchReducer({ type: "disableCartNotification" });
    }
  }, [cartState]);

  const logOut = async (userData: any, eCommerceDB: any) => {
    addUserEntry("checkOut", userData, eCommerceDB);
    dispatch(resetCart());
    dispatch(signOut());
    dispatch(resetProducts());
    dispatch(resetFeaturedProducts());
    dispatch(resetSelectedProducts());

    await auth.signOut();
    await reduxPersistor.purge();
    navigate("/LoginPage", { replace: true });
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
    userData,
  };
}
