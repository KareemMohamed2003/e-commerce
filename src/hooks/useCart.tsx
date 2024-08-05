import { useReducer } from "react";
import Loader from "../components/Loader";
import TransactionLoader from "../components/TransactionLoader";
import { getCart } from "../Redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
export default function useCart() {
   const currentUserId = useSelector((state: any) => state.user.userId);
   const dispatchToStore = useDispatch();
   const cartReducer = (state: any, action: any) => {
      switch (action.type) {
         case "loading":
            // console.log("loading State", state)
            return (state = { cart: <Loader /> });
         case "empty":
            // console.log("empty is Called", state)
            return (state = { cart: <h1>your shopping Cart is Empty</h1> });
         case "loaded":
            // console.log("loaded is Called", state)
            return (state = { cart: action.payload });
         case "loading Transaction":
            return (state = { cart: <TransactionLoader /> });
         case "checkout":
            return (state = { cart: [], displayCheckoutModal: true });
         default:
            break;
      }
   };
   //
   const fetchCart = async () => {
      dispatch({ type: "loading" });
      const request = await fetch(
         `https://e-commerce-cbe7c-default-rtdb.firebaseio.com/users/${currentUserId}/cart.json`,
      );
      const res = await request.json();


      if (!res) {
         dispatch({ type: "empty" });
      } else {
         dispatch({ type: "loading" });
         getCart({ res })
         dispatch({ type: "loaded", payload: res });
      }

      return res;
   };

   const initialState: any = {
      cart: [],
   };

   const [cartState, dispatch]: any = useReducer(cartReducer, initialState);

   return {
      cartState, dispatch, fetchCart
   }
}