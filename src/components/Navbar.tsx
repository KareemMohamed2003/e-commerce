import { Fragment } from "react";
import { eCommerceDB } from "../lib/firebase";
import { Link } from "react-router-dom";
import SideBar from "./Sidebar";
import NotificationPopup from "./NotificationPopup";
import LogoutIcon from "./svg-components/LogoutIcon";
import CartIcon from "./svg-components/CartIcon";
import Portal from "./Portal";
import useNavbar from "../hooks/useNavbar";
import "../sass/navbar.scss";
function Navbar() {
  const electronics = [
    "cameras",
    "security&surveillance",
    "vehicle electronics",
    "headphones",
  ];
  const menCategories = [
    "men's shoes",
    "men's watches",
    "men's accessories",
    "men's clothing",
  ];
  const womenCategories = [
    "women's shoes",
    "women's handbags",
    "women's accessories",
    "women's clothing",
  ];
  const {
    toggleMenu,
    notificationDisplay,
    dispatch,
    setMenuToggle,
    navigate,
    logOut,
    productsState,
    cartCount,
    userData,
  } = useNavbar();
  const username = userData.username;
  return (
    <Fragment>
      {notificationDisplay.toggle && (
        <Portal>
          {notificationDisplay.displayCartNotification && <NotificationPopup />}
        </Portal>
      )}
      <nav className="navbar">
        <section className="nav-heading">
          <div className="bars" onClick={() => setMenuToggle(!toggleMenu)}>
            {new Array(3).fill(0).map((_, index) => (
              <div
                key={index}
                className={
                  toggleMenu ? `transform bar${index + 1}` : `bar${index + 1}`
                }
              ></div>
            ))}
          </div>
          <div onClick={() => navigate("/home", { replace: true })}>
            <h1 className="main-heading">
              <span>Ease</span>
              Shop
            </h1>
          </div>
        </section>

        {toggleMenu && (
          <SideBar
            setMenuToggle={setMenuToggle}
            menCategories={menCategories}
            womenCategories={womenCategories}
            dispatch={dispatch}
            electronics={electronics}
            productsState={productsState}
          />
        )}

        <div className="nav-icons">
          <h1 className="username">
            {username && username.slice(0, 8).concat("...")}
          </h1>
          <Link to="/home/cart">
            <div
              className="cart-icon-container"
              style={{ position: "relative" }}
            >
              {cartCount > 0 ? (
                <div className="cart-counter">
                  <span>{cartCount > 99 ? `${99}+` : cartCount}</span>
                </div>
              ) : null}
              <div className="cart-icon">
                <CartIcon />
              </div>
            </div>
          </Link>
          <div
            className="logout-icon-container"
            onClick={() => {
              logOut(userData, eCommerceDB);
            }}
          >
            <div className="logout-icon">
              <LogoutIcon />
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
