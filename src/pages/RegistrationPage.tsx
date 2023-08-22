import "../sass/loginForm.scss";
import RegistrationPopup from "../components/RegistrationPopup";
import LoginModal from "../components/LoginModal";
import Portal from "../components/Portal";
import { useEffect, useReducer, useRef, useState } from "react";
import { changeUsername, addUsertoFireBase, app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup } from "../Redux/popupSlice";
import { store } from "../Redux/reduxStore";
import { getError } from "../Redux/userDataSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { dateFormatter } from "../Functions"
import { getDatabase, set } from "firebase/database";

export default function RegistrationPage() {

   const { displayPopup } = useSelector(((state: any) => state.popupToggle))

   const initialState = {

      emailError: false, emailErrorMsg: "", emailValue: null,
      passwordError: false, passwordErrorMsg: "", passwordValue: null,
      usernameError: false, usernameErrorMsg: "", usernameValue: null

   }

   function errorReducer(state: any, action: any) {

      switch (action.type) {
         case "checkEmailField":

            if (action.fieldValue === "" || action.fieldValue == null)
               return {
                  ...state,
                  emailError: true,
                  emailErrorMsg: "EMAIL FIELD IS EMPTY", emailValue: null
               }

            if (action.fieldValue.length < 5) {
               return {
                  ...state,
                  emailError: true,
                  emailErrorMsg: "EMAIL ADDRESS MUST INCLUDE BE AT LEAST 5 CHARACTERS"
               }
            }
            if (!action.fieldValue.includes("@")) {
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

            if (action.fieldValue.length < 8) {
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
         case "checkUsernameField": {

            if (action.fieldValue.length < 4) {
               return {
                  ...state,
                  usernameError: true,
                  usernameErrorMsg: "USERNAME MUST AT LEAST BE FOUR CHARACTERS "
               }
            }
            if (action.fieldValue === "") {
               return {
                  ...state,
                  usernameError: true,
                  usernameErrorMsg: "USERNAME FIELD IS EMPTY"
               }
            }

            else {
               return {
                  ...state
                  , usernameError: false,
                  usernameErrorMsg: null,
                  usernameValue: action.fieldValue
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
   const emailRef = useRef<any>(null);
   const passwordRef = useRef<any>(null);
   const userNameRef = useRef<any>(null)
   const [toggleModal, setModalToggle] = useState(false)
   const [isLoading, setLoading] = useState<any>()
   const dispatchToStore = useDispatch();

   const db = getDatabase(app);

   const signUp = (email: string, password: string, username: string, createAccount: boolean) => {

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {

            changeUsername(email, password, username, createAccount)

            // console.log("user : " + userCredential.user.uid + "has been created")

            addUsertoFireBase(userCredential.user.uid, username, email, dateFormatter.format(new Date()), db)

            store.dispatch(togglePopup(true))



         })

         .catch((error) => {

            const errorCode = error.code;
            // console.log(errorCode)
            dispatchToStore(getError({ errorCode: errorCode.split("/")[1] }))
            setModalToggle(true)
            const errorMessage = error.message;
            // console.log(errorMessage)

         });

   }

   const submitForm = (e: any) => {
      e.preventDefault();
      const emailAddress = e.target[0].value;
      dispatch({ type: "checkEmailField", fieldValue: emailAddress })
      const password = e.target[1].value;
      dispatch({ type: "checkPasswordField", fieldValue: password })
      const username = e.target[2].value;

      dispatch({ type: "checkUsernameField", fieldValue: username })

      emailRef.current!.value = "";
      passwordRef.current.value = "";
      userNameRef.current.value = "";

   }

   useEffect(() => {

      if (formErrors.emailValue !== null && formErrors.passwordValue && formErrors.usernameValue) {
         signUp(formErrors.emailValue, formErrors.passwordValue, formErrors.usernameValue, true)
         dispatch({ type: "reset" })

      }

   }, [formErrors])


   return (

      <section className="form-page">
         {toggleModal &&
            <Portal>
               <LoginModal setLoading={setLoading} setModalToggle={setModalToggle} />
            </Portal>}
         {displayPopup && <RegistrationPopup />}
         <div className="loginForm">
            <h1 >create account</h1>
            <form onSubmit={submitForm} >
               {formErrors.emailError && <p className="error-message">
                  {formErrors.emailErrorMsg} </p>}

               <input
                  ref={emailRef}
                  type="text"
                  name="emailField"
                  placeholder="email"
                  autoComplete="off"
               />

               {formErrors.passwordError &&
                  <p className="error-message">
                     {formErrors.passwordErrorMsg} </p>}

               <input
                  autoComplete="off"
                  ref={passwordRef} type="password"
                  name="passwordField"
                  placeholder="password"
               />
               {formErrors.usernameError &&
                  <p className="error-message">
                     {formErrors.usernameErrorMsg} </p>}
               <input
                  autoComplete="off"
                  ref={userNameRef} type="text"
                  name="userNameField"
                  placeholder="username"
               />
               <button className="sign-up-btn" type="submit">Register</button>
            </form>
         </div>
      </section>
   )
}
