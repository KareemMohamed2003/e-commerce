import { loginAction, loginError } from "../../types";
export const initialState: loginError = {
  emailError: null,
  emailErrorMsg: '',
  emailValue: null,
  passwordError: null,
  passwordErrorMsg: '',
  passwordValue: null,
};

export const errorReducer = (state: loginError, action: loginAction): loginError => {
  switch (action.type) {
    case 'checkEmailField':
      if (action.fieldValue === '') {
        return {
          ...state,
          emailError: true,
          emailErrorMsg: 'EMAIL FIELD IS EMPTY',
          emailValue: null,
        };
      } else if (!action.fieldValue!.includes('@')) {
        return {
          ...state,
          emailError: true,
          emailErrorMsg: 'EMAIL ADDRESS MUST INCLUDE @',
        };
      } else {
        return {
          ...state,
          emailError: false,
          emailErrorMsg: null,
          emailValue: action.fieldValue!,
        };
      }

    case 'checkPasswordField': {
      if (action.fieldValue === '') {
        return {
          ...state,
          passwordError: true,
          passwordErrorMsg: 'PASSWORD FIELD IS EMPTY',
        };
      } else if (action.fieldValue!.length < 8) {
        return {
          ...state,
          passwordError: true,
          passwordErrorMsg: 'PASSWORD MUST HAVE AT LEAST 8 CHARACTERS',
        };
      } else {
        return {
          ...state,
          passwordError: false,
          passwordErrorMsg: null,
          passwordValue: action.fieldValue!,
        };
      }
    }

    case 'reset':
      return initialState;
    default:
      return initialState;

  }
};
