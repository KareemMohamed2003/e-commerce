import { useEffect, useReducer, useState } from 'react';
import { useAppSelector } from '../Redux/hooks';
import { getCartTotal, isObjLength } from '../lib/helpers';
import TransactionLoader from '../components/loaders/TransactionLoader';
import Loader from '../components/loaders/Loader';
import { CartProps, cartAction, cartActionType } from '../types';

const initialState: CartProps = {
  cart: [],
  displayCheckoutModal: false,
};

const cartReducer = (state: CartProps, action: cartAction): CartProps => {
  switch (action.type) {
    case 'loading':
      return { displayCheckoutModal: false, cart: <Loader /> };
    case 'empty':
      return {
        cart: <h1 className="cart-heading">your shopping Cart is Empty</h1>,
        displayCheckoutModal: false,
      };
    case 'loaded':
      return { displayCheckoutModal: false, cart: action.payload };
    case 'loading Transaction':
      return { displayCheckoutModal: false, cart: <TransactionLoader /> };
    case 'checkout':
      return { cart: [], displayCheckoutModal: true };
    default:
      return initialState;
  }
};

export default function useCart() {
  const cart = useAppSelector((state) => state.cartState.cart);
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const [cartTotal, setTotal] = useState<number | null>();

  useEffect(() => {
    dispatch({ type: cartActionType.loading });
    if (isObjLength(cart)) {
      dispatch({ type: cartActionType.loaded, payload: cart });
      setTotal(getCartTotal(cart));
    } else {
      setTotal(0);
      return dispatch({ type: cartActionType.empty });
    }
  }, [cart, cartTotal]);

  return {
    cartState,
    dispatch,
    cartTotal,
  };
}
