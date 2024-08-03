import { onAuthStateChanged } from "firebase/auth";
import { eCommerceAuth } from "../firebase";
import { getCart } from "../Redux/cartSlice";
import { setUserSlice, signOut } from "../Redux/userDataSlice";
import {
   Navigate,
   useLocation,
   useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../Redux/fetchUserData";
export default function AuthProvider({ children, path }: any) {
   const navigate = useNavigate();
   const currentUser = useSelector((state: any) => state.user);
   const dispatch = useDispatch()
   console.log(currentUser);
   const location = useLocation();
   console.log("location", location);
   const [auth, setAuth] = useState<boolean>(false);

   // dummmy redux state
   // creationDate(pin):"January 4, 2023 at 7:39:02 AM GMT+2"
   // email(pin):"adam2022@gmail.com"
   // favouriteItems(pin):0
   // userId(pin):"rV9AnSRqVGTmNNR19WZJXFnZamv2"
   // username(pin):"adam2022"
   // here is what we can do
   console.log("protected Route");


   // check for expiration date 

   // first when we start the app we redirect to root "/" path
   // check if user is authenticated if user is authenticated
   // redirect the user to the home page , auth provider needs to also check for the redux store if there's data stored there
   // or maybe not
   // BTW we should use the react-router form to prevcent the user from going back after logging in
   // here are my conslusion firest we either implement a context in the App or rely on the redux store
   // or we use data loaders if we go with the loader approach we will have a problem which is that we are will have to
   // provider a loader for each component

   // we need to persist the redux store or save the data somewhere
   console.log(false ? children : <Navigate to="/LoginPage" replace />);
   // console.log(currentUser.userId)

   return currentUser.userId ? children : <Navigate to="/LoginPage" replace />;

}
