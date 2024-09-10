import { createSlice } from '@reduxjs/toolkit';
import { userDataProps } from '../types';

const initialState: userDataProps = {
  userId: null,
  errorMessage: false,
  username: null,
};

export const userDataSlice = createSlice({
  name: 'userDataSlice',
  reducers: {
    setUserSlice: (state, action) => {
      return { ...action.payload.userInfo };
    },

    signOut: () => {
      return {
        userId: null,
        errorMessage: false,
        username: null,
      };
    },
    getError: (state, action) => {
      switch (action.payload.errorCode) {
        case 'internal-error':
          return {
            ...initialState,
            errorMessage: 'oops something went Wrong',
          };

        case 'user-not-found':
          return {
            ...initialState,
            errorMessage: 'user not found',
          };
        case 'invalid-email':
          return {
            ...initialState,
            errorMessage: 'invalid email address',
          };
        case 'wrong-password':
          return {
            ...initialState,
            errorMessage: 'wrong password',
          };
        case 'network-request-failed':
          return {
            ...initialState,
            errorMessage:
              'opps something went wrong ,please check your internet connection',
          };
        case 'email-already-in-use':
          return {
            ...initialState,
            errorMessage: 'email address already in use',
          };
        case 'clear-error':
          return initialState;
        default:
          return {
            ...initialState,
            errorMessage: "couldn't find this email address",
          };
      }
    },
  },

  initialState,
});

export default userDataSlice.reducer;
export const { signOut, setUserSlice, getError } =
  userDataSlice.actions;
