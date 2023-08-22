import NotificationPopup from "./NotificationPopup";
import LogoutIcon from "./svg-components/LogoutIcon";
import CartIcon from "./svg-components/CartIcon";
import HomeIcon from "./svg-components/HomeIcon";
import { Fragment, useReducer, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { displayProducts } from "../Redux/SelectedCategorySlice";
import { addUserEntry } from "../pages/LoginPage";
import { getAuth } from "firebase/auth";
import { resetCart } from "../Redux/CartSlice";
import { signOut } from "../Redux/userDataSlice";
import { eCommerceDB } from "../firebase";
import Cart from "./Cart";
import Portal from "./Portal";
import "../sass/navbar.scss"

function Navbar() {

   const auth = getAuth()
   const navigate = useNavigate()
   const cartCount = useSelector((state: any) => state.cartState.cart?.length)

   const logOut = (userData: any, eCommerceDB: any) => {
      addUserEntry("checkOut", userData, eCommerceDB);
      dispatchToStore(signOut())
      dispatchToStore(resetCart())
      auth.signOut()
      navigate("/", { replace: true })
   }

   const initialState = {
      toggle: false, displayCart: false, displayFavourites: false,
      displayNotifications: false,
      displayCartNotification: false
   }

   const displayReducer = (state: any, action: any) => {
      switch (action.type) {
         case "displayCart":
            return {
               displayCart: true,
               toggle: !state.toggle
            }

         case "displayNotification":
            return {
               displayNotification: !state.displayNotification,
               toggle: !state.toggle
            }
         case "displayCartNotification":
            return {
               displayCartNotification: true,
               toggle: true
            }
         case "disableCartNotification":
            return {
               displayCartNotification: true,
               toggle: false
            }
         default:
            break;
      }
   }

   const [toggleMenu, setMenuToggle] = useState(false);
   const dispatch = useDispatch();
   const dispatchToStore = useDispatch()
   const ProductsState = useSelector((state: any) => state)
   const electronics = ["cameras", "security&surveillance", "vehicle electronics", "headphones"];
   const menCategories = ["men's shoes", "men's watches", "men's accessories", "men's clothing"];
   const womenCategories = ["women's shoes", "women's handbags", "women's accessories", "women's clothing"];
   const [displayState, dispatchReducer]: any = useReducer<any>(displayReducer, initialState)
   const cartState = useSelector((state: any) => state.cartState)
   const userData = useSelector((state: any) => state.user)

   // console.log(cartState)
   useEffect(() => {
      if (cartState.checkout) {

         dispatchReducer({ type: "displayCartNotification" })
      }
      if (cartState.isItemChanged) {
         dispatchReducer({ type: "displayCartNotification" })
      }

      else if (!cartState.isItemPending) {
         // this prevents the checkout notification from getting to the checkout expression 
         dispatchReducer({ type: "disableCartNotification" })
      }

   }, [cartState])

   return (

      <Fragment>
         {
         displayState.toggle &&
            <Portal>
               {displayState.displayCart && <Cart dispatchReducer={dispatchReducer} />}
               {displayState.displayCartNotification &&  <NotificationPopup />}
            </Portal>
         }
{/* */}
         <nav className="navbar">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
               <div className="bars" onClick={() => { setMenuToggle(!toggleMenu) }}>
                  <div className={toggleMenu ? "transform bar1" : "bar1"}></div>
                  <div className={toggleMenu ? "transform bar2" : "bar2"}></div>
                  <div className={toggleMenu ? "transform bar3" : "bar3"}></div>
               </div>

               <section className="home-icon-container">

                  <div className="home-icon" style={{ margin: 'auto' }} onClick={() => navigate("/home", { replace: true })}>
                     <HomeIcon />
                  </div>
               </section>

            </div>


            {toggleMenu &&
               <div className="menu">
                  <h1 className="menu-heading">shop by department</h1>

                  <h2 className="category-heading">electronics</h2>
                  {electronics.map(el =>

                     <Link key={el} to={`SelectedCategory`}
                        className="link">
                        <div onClick={() => {
                           dispatch(displayProducts({ state: ProductsState, type: el }))
                        }}>{el}</div> </Link>)}


                  <h2 className="category-heading">women's Fashion</h2>
                  {womenCategories.map(el =>

                     <Link className="link" key={el} to={`SelectedCategory`}>
                        <div onClick={() => {
                           dispatch(displayProducts({ state: ProductsState, type: el }))
                        }}>{el}</div> </Link>)}
                  <h2 className="category-heading">men's Fashion</h2>

                  {menCategories.map(el =>

                     <Link to={`SelectedCategory`} key={el} className="link">
                        <div onClick={() => {
                           dispatch(displayProducts({ state: ProductsState, type: el }))
                        }}>{el}</div> </Link>)}

               </div>
            }

            <div className="nav-icons">
               <h1 className="username">{userData.username ? `${userData.username}` : null}</h1>

               <div className="cart-icon-container" onClick={() => { dispatchReducer({ type: "displayCart" }) }} style={{ position: "relative" }}>
                  {cartCount > 0 ? <div className="cart-counter" >
                     <span>
                        {cartCount}
                     </span>

                  </div> : null}
                  <div className="cart-icon">

                     <CartIcon />
                  </div>

               </div>

               <div
                  className="logout-icon-container"
                  onClick={() => { logOut(userData, eCommerceDB) }
                  }>
                  <div className="logout-icon">

                     <LogoutIcon />
                  </div>
               </div>

            </div>

         </nav>
      </Fragment>

   )
}

export default Navbar;


