import { useEffect, useState, useReducer, useRef, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { getCart } from '../Redux/cartSlice';
import { setUserSlice } from '../Redux/userDataSlice';
import { useNavigate } from 'react-router-dom';
import { login, eCommerceAuth, eCommerceDB, readFromDB } from '../lib/firebase';
import { addUserEntry } from '../lib/cartActions';
import { mergeIdsToProducts } from '../lib/helpers';
import { errorReducer, initialState } from '../lib/reducers/loginReducer';
import { useAppSelector } from '../Redux/hooks';
import { LoginForm, userCredentials } from '../types';

export default function useLogin() {
  const navigate = useNavigate();
  const dispatchToStore = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [userCredentials, setUserCredentials] =
    useState<userCredentials | null>(null);
  const [toggleModal, setModalToggle] = useState<boolean>(false);
  const [formErrors, dispatch] = useReducer(
    errorReducer,
    initialState
  );


  const errorMessage = useAppSelector((state) => state.user.errorMessage);
  const currentUser = useAppSelector((state) => state.user);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitForm = (e: FormEvent<LoginForm>) => {

    e.preventDefault();

    const emailAddress = e.currentTarget.elements["emailInput"].value;
    dispatch({ type: 'checkEmailField', fieldValue: emailAddress });
    const password = e.currentTarget.elements["passwordInput"].value;
    dispatch({ type: 'checkPasswordField', fieldValue: password });
    emailRef.current!.value = '';
    passwordRef.current!.value = '';
    setLoading(false);
  };

  const fetchUserData = async (id: string | undefined) => {
    const userDataQuery = readFromDB(`/users/${id}`, eCommerceDB);
    const queryRes = await userDataQuery;
    const { userId, creationDate, email, username, cart } = queryRes;
    const cartItems = mergeIdsToProducts(cart ? cart : []);
    dispatchToStore(getCart(cartItems)); // this would only fetch the user Cart when the user  logs in
    const userInfo = { userId, creationDate, email, username };
    dispatchToStore(setUserSlice({ userInfo }));
    setLoading(false);
    navigate('/home', { replace: true });
  };

  useEffect(() => {
    if (currentUser.userId) setLoading(true);
  }, [userCredentials, currentUser]);

  useEffect(() => {
    if (errorMessage) setModalToggle(true);
  }, [errorMessage]);

  useEffect(() => {
    if (
      formErrors.emailValue !== null &&
      formErrors.emailValue !== '' &&
      !formErrors.passwordError &&
      !formErrors.emailError
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
      dispatch({ type: 'reset' });
    }
  }, [formErrors]);

  useEffect(() => {
    if (userCredentials) {
      fetchUserData(userCredentials?.id);
      addUserEntry('checkIn', userCredentials, eCommerceDB);
      setUserCredentials(null);
    }
  }, [userCredentials]);

  return {
    loading,
    setLoading,
    submitForm,
    emailRef,
    passwordRef,
    toggleModal,
    formErrors,
    setModalToggle,
  };
}
