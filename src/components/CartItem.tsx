import { useDispatch, useSelector } from "react-redux"
import { addItemToCart, decrementItem, deleteItem } from "../Functions";
import RemoveItemIcon from "./svg-components/RemoveItemIcon";
export default function CartItem({ itemName, itemPrice, itemImg, quantity, category }: any) {
   const dispatchToStore = useDispatch();
   const currentUserId = useSelector((state: any) => state.user.userId)
   const Item = { imageTitle: itemName, price: itemPrice, imageSrc: itemImg, quantity, category }


   return (

      <div className="cart-item">
         <div className="img-container">

            <img src={itemImg} alt="" />
         </div>
         <div className="cart-item-description">
            <p>
               {itemName.length > 55 ? itemName.slice(0, 65).concat("...") : itemName}

            </p>
         </div>

         <div className="cart-item-quantity">

            <p>x</p>
            <p>{quantity}</p>

         </div>
         <div className="cart-item-price" >
            <p>price</p>
            <p>{itemPrice}$</p>

         </div>
         <div className="buttons">

            <button className="add-btn"
               onClick={() => { addItemToCart(Item, currentUserId, dispatchToStore) }}>

               + </button>
            <button className="subtract-btn"
               onClick={() => { decrementItem(Item, currentUserId, dispatchToStore) }}>
               - </button>
            <button className="delete-btn"
               onClick={() => {
                  deleteItem(Item, currentUserId, dispatchToStore)
               }} >
               <div className="remove-item-icon">
                  <RemoveItemIcon />
               </div>
            </button>
         </div>

      </div>

   )

}