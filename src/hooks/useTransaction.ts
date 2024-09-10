import { useDispatch } from 'react-redux';
import { useAppSelector } from '../Redux/hooks';
import { sendTransaction } from '../lib/cartActions';
import { getAuth } from 'firebase/auth';
import { checkout, resetCart } from '../Redux/cartSlice';
import { cartAction } from '../types';

const auth = getAuth();
export default function useTransaction(cart: [], dispatch: React.Dispatch<cartAction>) {
  const currentUserId = useAppSelector((state) => state.user.userId) as string;
  const dispatchToStore = useDispatch();

  const handleTransaction = async () => {
    dispatch({ type: "loading Transaction" });
    await sendTransaction(cart, auth, currentUserId)
      .then(
        () => {
          dispatch({ type: "empty" });
          dispatchToStore(checkout('checkout complete'));
          setTimeout(() => dispatchToStore(resetCart()), 3000);
        },
        (rejection) => {
          // dispatchToStore(checkout("checkout failed"));
        }
      )
      .catch((error) => console.log(error));
  };
  return { handleTransaction };
}
