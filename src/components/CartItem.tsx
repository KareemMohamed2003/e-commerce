import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, decrementItem, deleteItem } from "../lib/cartActions";
import RemoveItemIcon from "./svg-components/RemoveItemIcon";

interface CartItemProps {
  id: string;
  itemName: string;
  itemImg: string;
  itemPrice: number;
  quantity: number;
  category: string;
  dispatch: React.Dispatch<any>;
}
export default function CartItem({
  itemName,
  itemPrice,
  itemImg,
  quantity,
  category,
  dispatch,
  id,
}: CartItemProps) {

  const dispatchToStore = useDispatch();
  const currentUserId = useSelector((state: any) => state.user.userId);
  const item = {
    imageTitle: itemName,
    price: itemPrice,
    imageUrl: itemImg,
    quantity,
    category,
    id,
  };

  return (
    <div className="cart-item">
      <div className="img-container">
        <img src={itemImg} alt="" />
      </div>
      <div className="cart-item-description">
        <p>
          {itemName.length > 55
            ? itemName.slice(0, 65).concat("...")
            : itemName}
        </p>
      </div>

      <div className="cart-item-quantity">
        <p>x</p>
        <p>{quantity}</p>
      </div>
      <div className="cart-item-price">
        <p>{itemPrice}$</p>
      </div>
      <div className="buttons">
        <button
          className="add-btn"
          onClick={() => {

            addItemToCart({ ...item, quantity: 1 }, currentUserId, dispatchToStore, dispatch)
          }
          }
        >
          +{" "}
        </button>
        <button
          className="subtract-btn"
          onClick={() => decrementItem(item, currentUserId, dispatchToStore, dispatch)

          }
        >
          -{" "}
        </button>
        <button
          className="delete-btn"
          onClick={() =>
            deleteItem(item.id, currentUserId, dispatchToStore, dispatch)
          }
        >
          <div className="remove-item-icon">
            <RemoveItemIcon />
          </div>
        </button>
      </div>
    </div>
  );
}
