import { Link, Navigate } from "react-router-dom";
import { useState, useReducer, useRef, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { store } from "../Redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { getError, setUserSlice, signOut } from "../Redux/userDataSlice";
import "../sass/loginForm.scss";
import Portal from "../components/Portal";
import LoginModal from "../components/LoginModal";
import WhirlyLoader from "../components/whirlyLoader";
import { dateFormatter } from "../Functions";
import { writeToDB, eCommerceAuth, eCommerceDB } from "../firebase";
import UseInitializeApp from "../hooks/UseLogin";

// console.log(localStorage.getItem("persist:root"))
const storage = JSON.parse(localStorage.getItem("persist:root")!);
// console.log(storage?.user);
// const data = JSON.parse(storage)
// console.log(storage)
export const addUserEntry = async (
  check: any,
  userData: any,
  database: any,
) => {
  const exisitingActivites = await fetch(
    "https://admin-dashboard-f3c0a-default-rtdb.firebaseio.com/activites.json",
  );
  const res = await exisitingActivites.json();
  // console.log(res);
  let userEntry = {};

  if (check === "checkIn") {
    userEntry = {
      signedInAt: dateFormatter.format(new Date()),
      username: userData?.username,
      email: userData?.email,
    };
  } else {
    userEntry = {
      signedOutAt: dateFormatter.format(new Date()),
      username: userData?.username,
      email: userData?.email,
    };
  }

  if (res) {
    writeToDB("/activites", [...res, userEntry], database, false);
  } else {
    writeToDB("/activites", [userEntry], database, false);
  }
};

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
  const [formErrors, dispatch]: any = useReducer<any>(
    errorReducer,
    initialState,
  );
  const [toggleModal, setModalToggle] = useState<any>(false);
  console.log("login page");
  const errorMessage = useSelector((state: any) => state.user.errorMessage);
  console.log("error message", errorMessage);
  const dispatchToStore = useDispatch();
  const auth = getAuth();
  const {
    loading,
    setLoading,
    userCredentials,
    setUserCredentials,
    fetchUserData,
  } = UseInitializeApp();
  const currentUser = useSelector((state: any) => state.user);
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
  var localStorageSpace = function () {
    var allStrings = "";
    for (var key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        allStrings += window.localStorage[key];
      }
    }
    return allStrings
      ? 3 + (allStrings.length * 16) / (8 * 1024) + " KB"
      : "Empty (0 KB)";
  };
  console.log("local storage space", localStorageSpace());
  useEffect(() => {
    // console.log(userCredentials)

    if (currentUser.userId) setLoading(true);
  }, [userCredentials, currentUser]);

  useEffect(() => {
    if (errorMessage) setModalToggle(true);
  }, [errorMessage]);

  const login = (email: any, password: any, auth: any, setLoading: any) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUserCredentials({
          username: user.displayName,
          id: user.uid,
          email: user.email,
        });
        setLoading(false);

        return user.uid;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage)
        dispatchToStore(getError({ errorCode: errorCode.split("/")[1] }));
      });
  };

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
      // setLoading(false)
      login(
        formErrors.emailValue,
        formErrors.passwordValue,
        eCommerceAuth,
        setLoading,
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
        {/* {loading && (
          <Portal>
            <WhirlyLoader />
          </Portal>
        )} */}
      </div>
    </section>
    // )
    // <Navigate to="/home" />
  );
}
