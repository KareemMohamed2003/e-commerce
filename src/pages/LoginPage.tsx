import { Link } from 'react-router-dom';
import Portal from '../components/Portal';
import LoginModal from '../components/LoginModal';
import WhirlyLoader from '../components/loaders/whirlyLoader';
import useLogin from '../hooks/useLogin';
import styles from '../sass/loginForm.module.scss';
export default function LoginPage() {
  const {
    loading,
    setLoading,
    submitForm,
    emailRef,
    passwordRef,
    toggleModal,
    formErrors,
    setModalToggle,
  } = useLogin();

  return (
    <section className={styles.formPage}>
      {toggleModal && (
        <Portal>
          <LoginModal setLoading={setLoading} setModalToggle={setModalToggle} />
        </Portal>
      )}

      <div className={styles.loginForm}>
        <h1>Login in</h1>
        <form onSubmit={submitForm}>
          {/* we need to move the loader away from the form  to ensure from submission */}
          {formErrors.emailError && (
            <p className={styles.errorMessage}>{formErrors.emailErrorMsg} </p>
          )}
          <input
            disabled={loading ? true : false}
            type="text"
            placeholder="email"
            ref={emailRef}
            name="emailInput"
          />
          {formErrors.passwordError && (
            <p className={styles.errorMessage}>
              {formErrors.passwordErrorMsg}{' '}
            </p>
          )}
          <input
            disabled={loading ? true : false}
            type="password"
            placeholder="password"
            name="passwordInput"
            ref={passwordRef}
          />
          <button
            className={styles.signInBtn}
            type="submit"
            disabled={loading ? true : false}
          >
            {' '}
            sign in
          </button>
        </form>

        <Link to="/RegistrationPage">
          <div className={styles.link}>
            <h3>
              don't have an account?
              <span></span>
            </h3>
          </div>
        </Link>
        {loading && (
          <Portal>
            <WhirlyLoader />
          </Portal>
        )}
      </div>
    </section>
  );
}
