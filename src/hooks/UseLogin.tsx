import { useDispatch } from "react-redux";
import { getCart } from "../Redux/cartSlice";
import { setUserSlice } from "../Redux/userDataSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userCredentials } from "../interfaces/userCredentials";
//  we can call this hook use Initlize App since it not only fetches user data but loads the user cart
// we can have a status indicatoing of fetching that user data has been successful or not and
// the user credentials for that user
//
export default function UseLogin() {
  const navigate = useNavigate();
  const dispatchToStore = useDispatch();
  const [userCredentials, setUserCredentials] =
    useState<userCredentials | null>(null);
  const [loading, setLoading] = useState<any>(false);

  const fetchUserData = async (userId: string | undefined) => {
    const userDataQuery = await fetch(
      `https://e-commerce-cbe7c-default-rtdb.firebaseio.com/users/${userId}.json`,
    );
    const queryRes = await userDataQuery.json();
    console.log(queryRes);
    dispatchToStore(getCart(queryRes.cart)); // this would only fetch the user Cart when the user  logs in
    const userInfo = { ...queryRes, userId };
    console.log(userInfo)
    dispatchToStore(setUserSlice({ userInfo }));
    console.log(userCredentials);
    setLoading(false);
    navigate("/home", { replace: true });
  };
  useEffect(() => {
    if (userCredentials) {
      console.log("user credentials", userCredentials)
      fetchUserData(userCredentials?.id);

      setUserCredentials(null)

    }
  }, [userCredentials]);
  return {
    loading,
    setLoading,
    userCredentials,
    setUserCredentials,
    fetchUserData,
  };
}

// const fetchUserData = async (userId: string | undefined) => {
//    const userDataQuery = await fetch(`https://e-commerce-cbe7c-default-rtdb.firebaseio.com/users/${userId}.json`)
//    const queryRes = await userDataQuery.json();
//    // console.log(queryRes)
//    dispatchToStore(getCart(queryRes.cart)) // this would only fetch the user Cart when the user  logs in
//    const userInfo = { ...queryRes, userId: currentLoggedUserId }
//    dispatchToStore(setUserSlice({ userInfo }))
//    // console.log(userCredentials)
//    setLoading(false)
//    navigate("/home", { replace: true })
// }
