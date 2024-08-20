import RegistrationPopup from "../components/RegistrationPopup";
import LoginModal from "../components/LoginModal";
import Portal from "../components/Portal";
import useRegister from "../hooks/useRegister";
import styles from "../sass/loginForm.module.scss";
export default function RegistrationPage() {
  const {
    emailRef,
    passwordRef,
    userNameRef,
    toggleModal,
    formErrors,
    setLoading,
    displayPopup,
    setModalToggle,
    submitForm,
  } = useRegister();


  return (
    <section className={styles.formPage}>
      {toggleModal && (
        <Portal>
          <LoginModal setLoading={setLoading} setModalToggle={setModalToggle} />
        </Portal>
      )}
      {displayPopup &&
        <Portal>
          <RegistrationPopup />
        </Portal>
      }
      <div className={styles.loginForm}>
        <h1>create account</h1>
        <form onSubmit={submitForm}>
          {formErrors.emailError && (
            <p className={styles.errorMessage}>{formErrors.emailErrorMsg} </p>
          )}

          <input
            ref={emailRef}
            type="text"
            name="emailField"
            placeholder="email"
            autoComplete="off"
          />

          {formErrors.passwordError && (
            <p className={styles.errorMessage}>
              {formErrors.passwordErrorMsg}{" "}
            </p>
          )}

          <input
            autoComplete="off"
            ref={passwordRef}
            type="password"
            name="passwordField"
            placeholder="password"
          />
          {formErrors.usernameError && (
            <p className={styles.errorMessage}>
              {formErrors.usernameErrorMsg}{" "}
            </p>
          )}
          <input
            autoComplete="off"
            ref={userNameRef}
            type="text"
            name="userNameField"
            placeholder="username"
          />
          <button className={styles.signupBtn} type="submit">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
