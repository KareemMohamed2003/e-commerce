import { useDispatch, useSelector } from "react-redux";
import { sendTransaction } from "../Functions";
import { getAuth } from "firebase/auth";
import { checkout, resetCart } from "../Redux/cartSlice";

const auth = getAuth()

export default function useTransaction(cartState: any, dispatch: any) {
   const currentUserId = useSelector((state: any) => state.user.userId);
   const dispatchToStore = useDispatch();
   const handleTransaction = async () => {
      const transaction = await sendTransaction(cartState, auth, currentUserId);

      console.log(transaction)
      dispatch({ type: "empty" });
      dispatch({ type: "loading Transaction" });

      setTimeout(() => {
         dispatchToStore(checkout("checkout complete"));
      }, 3000);

      setTimeout(() => {
         dispatchToStore(resetCart());
      }, 5000);
   }


   return { handleTransaction }
}