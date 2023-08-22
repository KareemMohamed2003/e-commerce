import { Link, useNavigate } from "react-router-dom";
import { useState, useReducer, useRef, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getError, getUserData } from "../Redux/userDataSlice";
import { userCredentials } from "../interfaces/userCredentials";
import { getCart } from "../Redux/CartSlice";
import "../sass/loginForm.scss";
import Portal from "../components/Portal";
import LoginModal from "../components/LoginModal";
import WhirlyLoader from "../components/whirlyLoader";
import { dateFormatter } from "../Functions";
import { writeToDB, eCommerceAuth, eCommerceDB } from "../firebase";

export const addUserEntry = async (check: any, userData: any, database: any) => {

   const exisitingActivites = await fetch("https://admin-dashboard-f3c0a-default-rtdb.firebaseio.com/activites.json");
   const res = await exisitingActivites.json();
   // console.log(res);
   let userEntry = {};

   if (check === "checkIn") {
      userEntry = { signedInAt: dateFormatter.format(new Date()), username: userData?.username, email: userData?.email }
   }

   else {
      userEntry = { signedOutAt: dateFormatter.format(new Date()), username: userData?.username, email: userData?.email }
   }

   if (res) {
      writeToDB("/activites", [...res, userEntry], database, false)
   }

   else {
      writeToDB("/activites", [userEntry], database, false)
   }


}

export default function LoginPage() {


   const initialState = {
      emailError: null, emailErrorMsg: "", emailValue: null,
      passwordError: null, passwordErrorMsg: "", passwordValue: null
   }


   const errorReducer = (state: any, action: any) => {

      switch (action.type) {
         case "checkEmailField":

            if (action.fieldValue === "") {


               return {
                  ...state,
                  emailError: true,
                  emailErrorMsg: "EMAIL FIELD IS EMPTY", emailValue: null
               }

            }

            else if (!action.fieldValue.includes("@")) {

               return {
                  ...state,
                  emailError: true,
                  emailErrorMsg: "EMAIL ADDRESS MUST INCLUDE @"
               }
            }

            else {

               return {
                  ...state,
                  emailError: false,
                  emailErrorMsg: null,
                  emailValue: action.fieldValue
               }
            }


         case "checkPasswordField": {

            if (action.fieldValue === "") {

               return {
                  ...state,
                  passwordError: true,
                  passwordErrorMsg: "PASSWORD FIELD IS EMPTY"
               }
            }

            else if (action.fieldValue.length < 8) {

               return {
                  ...state,
                  passwordError: true,
                  passwordErrorMsg: "PASSWORD MUST HAVE AT LEAST 8 CHARACTERS"
               }
            }

            else {

               return {
                  ...state
                  , passwordError: false,
                  passwordErrorMsg: null,
                  passwordValue: action.fieldValue
               }
            }

         }

         case "reset":

            return initialState
         default:
            break;
      }

   }
   const [formErrors, dispatch]: any = useReducer<any>(errorReducer, initialState)
   const [userCredentials, setUserCredentials] = useState<userCredentials>();
   const [toggleModal, setModalToggle] = useState<any>(false);
   const [isLoading, setLoading] = useState<any>(false)
   const errorMessage = useSelector((state: any) => state.user.errorMessage)
   const dispatchToStore = useDispatch();
   const navigate = useNavigate();
   const auth = getAuth()

   const currentLoggedUserId = auth.currentUser?.uid
   // console.log(currentLoggedUserId)
   const fetchUserData = async (userId: string | undefined) => {
      const userDataQuery = await fetch(`https://e-commerce-cbe7c-default-rtdb.firebaseio.com/users/${userId}.json`)
      const queryRes = await userDataQuery.json();
      // console.log(queryRes)
      dispatchToStore(getCart(queryRes.cart)) // this would only fetch the user Cart when the user  logs in 
      const userInfo = { ...queryRes, userId: currentLoggedUserId }
      dispatchToStore(getUserData({ userInfo }))
      // console.log(userCredentials)

      setLoading(false)
      navigate("/home", { replace: true })
   }

   useEffect(() => {
      // console.log(userCredentials)
      onAuthStateChanged(auth, (user) => {
         if (user && userCredentials) {
            // console.log(auth)
            // console.log(user)

            addUserEntry("checkIn", userCredentials, eCommerceDB)
         }

      })
      if (userCredentials)  {

         fetchUserData(userCredentials?.id)

      }

   }, [userCredentials])

   useEffect(() => { if (errorMessage) setModalToggle(true) }, [errorMessage])

   const login = (email: any, password: any, auth: any, setLoading: any) => {

      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const user = userCredential.user;

            setUserCredentials({ username: user.displayName, id: user.uid, email: user.email })
            setLoading(false)
            return user.uid;

         }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode, errorMessage)
            dispatchToStore(getError({ errorCode: errorCode.split("/")[1] }))
         });

   }



   const emailRef = useRef<any>(null);
   const passwordRef = useRef<any>(null);

   const submitForm = (e: any) => {

      e.preventDefault();
      const emailAddress = e.target[0].value;
      dispatch({ type: "checkEmailField", fieldValue: emailAddress })
      const password = e.target[1].value;
      dispatch({ type: "checkPasswordField", fieldValue: password })
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setLoading(false)

   }

   useEffect(() => {

      if (formErrors.emailValue !== null && formErrors.emailValue !== "" && formErrors.passwordError === false && formErrors.emailError === false) {

         setLoading(true)
     
            // setLoading(false)
            login(formErrors.emailValue, formErrors.passwordValue, eCommerceAuth, setLoading)

  

         dispatch({ type: "reset" })

      }

   }, [formErrors])

   return (
      // the best option for the  loader is to display a loader modal 
      <section className="form-page">
         {
            toggleModal &&
            <Portal>
               <LoginModal setLoading={setLoading} setModalToggle={setModalToggle} />
            </Portal>
         }

         <div className="loginForm">
            <h1>Login in</h1>
            <form onSubmit={submitForm}>
               {/* we need to move the loader away from the form  to ensure from submission */}
               {formErrors.emailError && <p className="error-message">{formErrors.emailErrorMsg} </p>}
               <input disabled={isLoading ? true : false} type="text" placeholder="email" ref={emailRef} />
               {formErrors.passwordError && <p className="error-message">{formErrors.passwordErrorMsg} </p>}
               <input disabled={isLoading ? true : false} type="password" placeholder="password" ref={passwordRef} />
               <button className="sign-in-btn" type="submit"> sign in</button>
            </form >

            <Link to="/RegistrationPage">
               <div className="link">
                  <h2>
                     don't have an account?
                     <span></span>
                  </h2>
               </div>
            </Link>
            {isLoading &&
               <Portal>
                  <WhirlyLoader />
               </Portal>}

         </div>

      </section>
   )

}