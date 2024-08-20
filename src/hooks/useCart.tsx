import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { getCartTotal, isObjLength } from "../lib/helpers";
import TransactionLoader from "../components/TransactionLoader";
import Loader from "../components/Loader";

const initialState: any = {
  cart: [],
};
const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "loading":
      return (state = { cart: <Loader /> });
    case "empty":
      return (state = {
        cart: <h1 className="cart-heading">your shopping Cart is Empty</h1>,
      });
    case "loaded":
      return (state = { cart: action.payload });
    case "loading Transaction":
      return (state = { cart: <TransactionLoader /> });
    case "checkout":
      return (state = { cart: [], displayCheckoutModal: true });
    default:
      break;
  }
};

export default function useCart() {
  const cart = useSelector((state: any) => state.cartState.cart);
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const [cartTotal, setTotal] = useState<number | null>()

  useEffect(() => {
    dispatch({ type: "loading" });
    if (isObjLength(cart)) {
      dispatch({ type: "loaded", payload: cart });
      setTotal(getCartTotal(cart))
    } else {
      setTotal(0)
      return dispatch({ type: "empty" });
    }
  }, [cart, cartTotal]);

  return {
    cartState,
    dispatch,
    cartTotal
  };
}
