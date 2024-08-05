import { Fragment, useEffect } from "react";
import CartItem from "./CartItem";
import CartIcon from "./svg-components/CartIcon";
import "../sass/cart.scss";
import "../sass/loader.scss";
import useCart from "../hooks/useCart";
import useTransaction from "../hooks/useTransaction";

export default function Cart(props: any) {
  const { cartState, dispatch, fetchCart } = useCart()
  const { handleTransaction } = useTransaction(cartState, dispatch)
  console.log(cartState)
  useEffect(() => {
    // we should only fetch the cart when an update happens 
    fetchCart();
  }, []);

  return (
    <Fragment>
      <div className="cart">
        <div className="cart-container">
          <div className="shopping-cart-icon">
            <CartIcon />
          </div>
          <h1 className="cart-heading">shopping Cart</h1>
        </div>

        {cartState?.cart instanceof Array
          ? cartState?.cart.map((el: any, index: any) => (
            <CartItem
              key={index}
              itemName={el.imageTitle}
              itemPrice={el.price}
              itemImg={el.imageSrc}
              quantity={el.quantity}
              category={el.category}
            />
          ))
          : cartState.cart}
        <div className="cart-btns">
          {cartState?.cart instanceof Array && <button
            className="checkout-btn"
            onClick={() => handleTransaction()}>
            checkout
          </button>}
          <button
            className="close-btn"
            onClick={() => {
              props.dispatchReducer({ type: "displayCart" });
            }}
          >
            close
          </button>
        </div>
      </div>
    </Fragment>
  );
}
