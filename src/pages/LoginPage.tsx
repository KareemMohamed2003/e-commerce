import { Link } from "react-router-dom";
import { useState, useReducer, useRef, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../Redux/userDataSlice";
import "../sass/loginForm.scss";
import Portal from "../components/Portal";
import LoginModal from "../components/LoginModal";
import WhirlyLoader from "../components/whirlyLoader";
import { writeToDB, eCommerceAuth, eCommerceDB, login } from "../firebase";
import useLogin from "../hooks/useLogin"

export default function LoginPage() {
  const initialState = {
    emailError: null,
    emailErrorMsg: "",
    emailValue: null,
    passwordError: null,
    passwordErrorMsg: "",
    passwordValue: null,
  };

  const errorReducer = (state: any, action: any) => {
    switch (action.type) {
      case "checkEmailField":
        if (action.fieldValue === "") {
          return {
            ...state,
            emailError: true,
            emailErrorMsg: "EMAIL FIELD IS EMPTY",
            emailValue: null,
          };
        } else if (!action.fieldValue.includes("@")) {
          return {
            ...state,
            emailError: true,
            emailErrorMsg: "EMAIL ADDRESS MUST INCLUDE @",
          };
        } else {
          return {
            ...state,
            emailError: false,
            emailErrorMsg: null,
            emailValue: action.fieldValue,
          };
        }

      case "checkPasswordField": {
        if (action.fieldValue === "") {
          return {
            ...state,
            passwordError: true,
            passwordErrorMsg: "PASSWORD FIELD IS EMPTY",
          };
        } else if (action.fieldValue.length < 8) {
          return {
            ...state,
            passwordError: true,
            passwordErrorMsg: "PASSWORD MUST HAVE AT LEAST 8 CHARACTERS",
          };
        } else {
          return {
            ...state,
            passwordError: false,
            passwordErrorMsg: null,
            passwordValue: action.fieldValue,
          };
        }
      }

      case "reset":
        return initialState;
      default:

        break;
    }
  };
  // useForm hook 
  const errorMessage = useSelector((state: any) => state.user.errorMessage);
  const [formErrors, dispatch]: any = useReducer<any>(
    errorReducer,
    initialState,
  );
  const [toggleModal, setModalToggle] = useState<any>(false);
  console.log("login page");
  // console.log("error message", errorMessage);
  const dispatchToStore = useDispatch();
  const currentUser = useSelector((state: any) => state.user);
  const {
    loading,
    setLoading,
    userCredentials,
    setUserCredentials,

  } = useLogin();

  // console.log(auth.currentUser);
  // this code is causing a lot of logs and trouble .
  // console.log("redux state with store.getState", store.getState());
  // console.log("redux store with hooks", currentUser);
  // we should use an Action instead to handle the user data fetching and redirection as well .
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     console.log("auth state login called");
  //     if (user) fetchUserData(user.uid);
  //     // if (user && userCredentials)
  //     //   addUserEntry("checkIn", userCredentials, eCommerceDB)
  //   });
  // }, []);
  // dispatchToStore(signOut())


  useEffect(() => {
    // console.log(userCredentials)

    if (currentUser.userId) setLoading(true);
  }, [userCredentials, currentUser]);

  useEffect(() => {
    if (errorMessage) setModalToggle(true);
  }, [errorMessage]);



  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const submitForm = (e: any) => {
    e.preventDefault();
    const emailAddress = e.target[0].value;
    dispatch({ type: "checkEmailField", fieldValue: emailAddress });
    const password = e.target[1].value;
    dispatch({ type: "checkPasswordField", fieldValue: password });
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setLoading(false);
  };

  useEffect(() => {
    if (
      formErrors.emailValue !== null &&
      formErrors.emailValue !== "" &&
      formErrors.passwordError === false &&
      formErrors.emailError === false
    ) {
      setLoading(true);
      login(
        formErrors.emailValue,
        formErrors.passwordValue,
        eCommerceAuth,
        setLoading,
        dispatchToStore,
        setUserCredentials
      );
      dispatch({ type: "reset" });
    }
  }, [formErrors]);
  console.log(currentUser.userId);
  return (
    // the best option for the  loader is to display a loader modal
    // we can check here is the user is logged in before rendering this page
    // currentUser.userId ? null : (
    <section className="form-page">
      {toggleModal && (
        <Portal>
          <LoginModal setLoading={setLoading} setModalToggle={setModalToggle} />
        </Portal>
      )}

      <div className="loginForm">
        <h1>Login in</h1>
        <form onSubmit={submitForm}>
          {/* we need to move the loader away from the form  to ensure from submission */}
          {formErrors.emailError && (
            <p className="error-message">{formErrors.emailErrorMsg} </p>
          )}
          <input
            // disabled={loading ? true : false}
            type="text"
            placeholder="email"
            ref={emailRef}
          />
          {formErrors.passwordError && (
            <p className="error-message">{formErrors.passwordErrorMsg} </p>
          )}
          <input
            // disabled={loading ? true : false}
            type="password"
            placeholder="password"
            ref={passwordRef}
          />
          <button className="sign-in-btn" type="submit">
            {" "}
            sign in
          </button>
        </form>

        <Link to="/RegistrationPage">
          <div className="link">
            <h2>
              don't have an account?
              <span></span>
            </h2>
          </div>
        </Link>
        {loading && (
          <Portal>
            <WhirlyLoader />
          </Portal>
        )}
      </div>
    </section>
    // )
    // <Navigate to="/home" />
  );
}
