import { useEffect, useReducer, useRef, useState } from 'react';
import { changeUsername, addUsertoFireBase, app } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../Redux/hooks';
import { togglePopup } from '../Redux/popupSlice';
import { getError } from '../Redux/userDataSlice';
import { getAuth, createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { dateFormatter } from '../lib/helpers';
import { getDatabase } from 'firebase/database';
import { errorReducer, initialState } from '../lib/reducers/registerReducer';
import { registerForm } from '../types';


export default function useRegister() {
  const auth = getAuth();
  const db = getDatabase(app);
  const { displayPopup } = useAppSelector((state) => state.popupToggle);
  const [toggleModal, setModalToggle] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatchToStore = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const [formErrors, dispatch] = useReducer(
    errorReducer,
    initialState
  );

  const register = (
    email: string,
    password: string,
    username: string,
    createAccount: boolean,
    auth: Auth
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        changeUsername(email, password, username, createAccount);
        addUsertoFireBase(
          userCredential.user.uid,
          username,
          email,
          dateFormatter.format(new Date()),
          db
        );

        dispatchToStore(togglePopup(true));
      })

      .catch((error) => {
        const errorCode = error.code;
        dispatchToStore(getError({ errorCode: errorCode.split('/')[1] }));
        setModalToggle(true);
        const errorMessage = error.message;
      });
  };

  const submitForm = (e: React.FormEvent<registerForm>) => {
    e.preventDefault();
    const emailAddress = e.currentTarget.elements["emailInput"].value;
    dispatch({ type: 'checkEmailField', fieldValue: emailAddress });
    const password = e.currentTarget.elements["passwordInput"].value;
    dispatch({ type: 'checkPasswordField', fieldValue: password });
    const username = e.currentTarget.elements["usernameInput"].value;
    dispatch({ type: 'checkUsernameField', fieldValue: username });
    console.log(emailAddress, password, username)
    emailRef.current!.value = '';
    passwordRef.current!.value = '';
    userNameRef.current!.value = '';
  };

  useEffect(() => {
    if (
      formErrors.emailValue &&
      formErrors.passwordValue &&
      formErrors.usernameValue
    ) {
      register(
        formErrors.emailValue,
        formErrors.passwordValue,
        formErrors.usernameValue,
        true,
        auth
      );
      dispatch({ type: 'reset' });
    }
  }, [formErrors]);

  return {
    emailRef,
    passwordRef,
    userNameRef,
    toggleModal,
    isLoading,
    formErrors,
    setLoading,
    displayPopup,
    setModalToggle,
    submitForm,
  };
}
