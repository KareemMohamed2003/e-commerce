import { useDispatch } from 'react-redux';
import { addItemToCart, decrementItem, deleteItem } from '../lib/cartActions';
import RemoveItemIcon from './svg-components/RemoveItemIcon';
import { useAppSelector } from '../Redux/hooks';
import { CartItemProps } from '../types';
export default function CartItem({
  imageTitle,
  price,
  imageUrl,
  quantity,
  category,
  id,
  dispatch,
}: CartItemProps) {
  const dispatchToStore = useDispatch();
  const currentUserId = useAppSelector((state) => state.user.userId) as string;

  const item = {
    imageTitle,
    price,
    imageUrl,
    quantity,
    category,
    id,
  };
  return (
    <div className="cart-item">
      <div className="img-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="cart-item-description">
        <p>
          {imageTitle.length > 55
            ? imageTitle.slice(0, 65).concat('...')
            : imageTitle}
        </p>
      </div>

      <div className="cart-item-quantity">
        <p>x</p>
        <p>{quantity}</p>
      </div>
      <div className="cart-item-price">
        <p>{price}$</p>
      </div>
      <div className="buttons">
        <button
          className="add-btn"
          onClick={() => {
            addItemToCart(
              { ...item, quantity: 1 },
              currentUserId,
              dispatchToStore,
              dispatch
            );
          }}
        >
          +{' '}
        </button>
        <button
          className="subtract-btn"
          onClick={() =>
            decrementItem(item, currentUserId, dispatchToStore, dispatch!)
          }
        >
          -{' '}
        </button>
        <button
          className="delete-btn"
          onClick={() =>
            deleteItem(item.id, currentUserId, dispatchToStore, dispatch!)
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
