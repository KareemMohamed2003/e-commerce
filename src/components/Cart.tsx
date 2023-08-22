import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useReducer } from "react";
import { getAuth } from "firebase/auth";
import { checkout, getCart, resetCart } from "../Redux/CartSlice";
import { sendTransaction } from "../Functions";
import CartItem from "./CartItem";
import Loader from "./Loader";
import CartIcon from "./svg-components/CartIcon";
import "../sass/cart.scss";
import "../sass/loader.scss";
import TransactionLoader from "./TransactionLoader";


export default function Cart(props: any) {
   const dispatchToStore = useDispatch()
   
   // this needs to be fetched from state 
   const auth = getAuth()
   const currentUserId = useSelector((state: any) => state.user.userId);
   // console.log(currentUserId)
   const cartReducer = (state: any, action: any) => {

      switch (action.type) {
         case "loading":
            // console.log("loading State", state)
            return state = { cart: <Loader /> }
         case "empty":
            // console.log("empty is Called", state)
            return state = { cart: <h1>your shopping Cart is Empty</h1> }
         case "loaded":
            // console.log("loaded is Called", state)
            return state = { cart: action.payload }
         case "loading Transaction":

            return state = { cart: <TransactionLoader /> }
         case "checkout":
            return state = { cart: [], displayCheckoutModal: true }
         default:
            break;

      }

   }

   const fetchCart = async () => {
      dispatch({ type: "loading" })
      const request = await fetch(`https://e-commerce-cbe7c-default-rtdb.firebaseio.com/users/${currentUserId}/cart.json`)
      const res = await request.json();
      // console.log(res)

      if (!res) {

         dispatch({ type: "empty" })

      }

      else {
         dispatch({ type: "loading" })
         getCart({ res })
         dispatch({ type: "loaded", payload: res })
      }

      return res;
   }

   const initialState: any = { cart: <h1 className="cart-text">your shopping cart is empty</h1> }
   const [cartState, dispatch] = useReducer(cartReducer, initialState)
 
   useEffect(() => {
      fetchCart()
   }, [])
   // console.log(cart)

   return (
      <Fragment>

         <div className="cart">
            <div className="cart-container">
               <div className="shopping-cart-icon">

               <CartIcon />
               </div>
               <h1 className="cart-heading">shopping Cart</h1>
            </div>

            {
               cartState?.cart instanceof Array ? cartState?.cart.map((el, index) =>

               (<CartItem
                  key={index}
                  itemName={el.imageTitle}
                  itemPrice={el.price}
                  itemImg={el.imageSrc}
                  quantity={el.quantity}
                  category={el.category}
               />)

               ) : cartState?.cart
            }
            <div className="cart-btns">
               <button className="checkout-btn"
                  onClick={() => {
                     sendTransaction(cartState, auth, currentUserId)
                     dispatch({ type: "empty" })
                     dispatch({ type: "loading Transaction" })
                     setTimeout(() => {
                        dispatchToStore(checkout("checkout complete"))

                     }, 3000)

                     setTimeout(() => {
                        dispatchToStore(resetCart())
                     }, 5000)
                  }}
               >checkout</button>

               <button className="close-btn" onClick={() => { props.dispatchReducer({ type: "displayCart" }) }}>close</button>
            </div>

         </div>
      </Fragment>
   )
}

