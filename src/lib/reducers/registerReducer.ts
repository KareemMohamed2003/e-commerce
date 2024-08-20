export const initialState = {
  emailError: false,
  emailErrorMsg: "",
  emailValue: null,
  passwordError: false,
  passwordErrorMsg: "",
  passwordValue: null,
  usernameError: false,
  usernameErrorMsg: "",
  usernameValue: null,
};

export function errorReducer(state: any, action: any) {
  switch (action.type) {
    case "checkEmailField":
      if (action.fieldValue === "" || action.fieldValue == null)
        return {
          ...state,
          emailError: true,
          emailErrorMsg: "EMAIL FIELD IS EMPTY",
          emailValue: null,
        };

      if (action.fieldValue.length < 5) {
        return {
          ...state,
          emailError: true,
          emailErrorMsg: "EMAIL ADDRESS MUST INCLUDE BE AT LEAST 5 CHARACTERS",
        };
      }
      if (!action.fieldValue.includes("@")) {
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
      if (action.fieldValue.length < 8) {
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
    case "checkUsernameField": {
      if (action.fieldValue.length < 4) {
        return {
          ...state,
          usernameError: true,
          usernameErrorMsg: "USERNAME MUST AT LEAST BE FOUR CHARACTERS ",
        };
      }
      if (action.fieldValue === "") {
        return {
          ...state,
          usernameError: true,
          usernameErrorMsg: "USERNAME FIELD IS EMPTY",
        };
      } else {
        return {
          ...state,
          usernameError: false,
          usernameErrorMsg: null,
          usernameValue: action.fieldValue,
        };
      }
    }
    case "reset":
      return initialState;
    default:
      break;
  }
}
