import CartItem from '../components/CartItem';
import CartIcon from '../components/svg-components/CartIcon';
import useCart from '../hooks/useCart';
import useTransaction from '../hooks/useTransaction';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sass/cart.scss';
import '../sass/loader.scss';
export default function Cart() {
  const { cartState, dispatch, cartTotal } = useCart();
  const { handleTransaction } = useTransaction(cartState?.cart as [], dispatch);
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="cart">
        <div className="cart-header">
          <div>
            <div className="cart-container">
              <div className="shopping-cart-icon">
                <CartIcon />
              </div>
              <h1>shopping Cart</h1>
            </div>
          </div>

          <div className="cart-btns">
            {cartState?.cart instanceof Array && (
              <button
                className="checkout-btn"
                onClick={() => handleTransaction()}
              >
                checkout
              </button>
            )}
            <button onClick={() => navigate(-1)} className="close-btn">
              close
            </button>
          </div>
        </div>
        {cartState?.cart instanceof Array && cartState.cart.length > 0 && (
          <div className="cart-total">
            <h1>Total</h1>
            <h1> ${cartTotal}</h1>
          </div>
        )}
        {cartState?.cart instanceof Array
          ? cartState?.cart.map((el, index) => (
              <CartItem
                key={index}
                imageTitle={el.imageTitle}
                price={el.price}
                imageUrl={el.imageUrl}
                quantity={el.quantity}
                category={el.category}
                id={el.id}
                dispatch={dispatch}
              />
            ))
          : cartState?.cart}
      </div>
    </Fragment>
  );
}
