import { useDispatch, useSelector } from "react-redux";
import { sendTransaction } from "../lib/cartActions";
import { getAuth } from "firebase/auth";
import { checkout, resetCart } from "../Redux/cartSlice";

const auth = getAuth();
export default function useTransaction(cart: any, dispatch: any) {
  const currentUserId = useSelector((state: any) => state.user.userId);
  const dispatchToStore = useDispatch();

  const handleTransaction = async () => {
    dispatch({ type: "loading Transaction" });
    await sendTransaction(cart, auth, currentUserId).then(
      () => {
        dispatch({ type: "empty" });
        dispatchToStore(checkout("checkout complete"));
        setTimeout(() => dispatchToStore(resetCart()), 3000);
      },
      (rejection) => {

      },
    );
  };
  return { handleTransaction };
}
