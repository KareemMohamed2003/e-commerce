import { useSelector } from "react-redux";
import { useState, useEffect } from "react"
import "../sass/notificationPopup.scss";
import AddIcon from "./svg-components/AddIcon";
import DeleteItemIcon from "./svg-components/DeleteItemIcon";
import CheckoutIcon from "./svg-components/CheckoutIcon";

export default function NotificationPopup() {
      const transactionMessage = useSelector((state: any) => state.cartState.message)

      useEffect(() => {

            switch (transactionMessage) {
                  case "item added to cart":
                        setIcon({ styling: "notificationPopup add-notification", icon:<div className="notification-icon-container"><AddIcon/></div>  });
                        break;
                  case "item removed from cart":
                        setIcon({ styling: "notificationPopup delete-notification", icon:<div className="notification-icon-container"><DeleteItemIcon/></div> })
                        break;
                  case "checkout complete":
                        setIcon({ styling: "notificationPopup checkout-notification", icon: <div className="notification-icon-container"><CheckoutIcon /></div> })
                        break;
            }

      }, [transactionMessage])

      const [Icon, setIcon] = useState<any>( { icon: null, style: "" })
   
      // { icon: null, style: "" }

      return (

            <div className={Icon.styling}>
                  {Icon.icon}

                  <h1>{transactionMessage}</h1>
            </div>


      )

}

