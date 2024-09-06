import { useDispatch } from 'react-redux';
import { getError } from '../Redux/userDataSlice';
import { useEffect } from 'react';
import LoginIcon from './svg-components/LoginIcon';
import '../sass/LoginModal.scss';
import { useAppSelector } from '../Redux/hooks';
import { LoginModalProps } from '../types';
export default function LoginModal({
  setModalToggle,
  setLoading,
}: LoginModalProps) {
  const errorMessage = useAppSelector((state) => state.user.errorMessage);

  useEffect(() => {
    if (errorMessage) {
      setLoading(false);
    }
  }, [errorMessage]);

  const dispatchToStore = useDispatch();

  return (
    <section className="login-modal">
      <div className="login-icon">
        <LoginIcon />
      </div>

      <div>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {' '}
          {errorMessage}
        </p>
      </div>
      <button
        onClick={() => {
          setModalToggle(false);
          dispatchToStore(getError({ errorCode: 'clear-error' }));
        }}
      >
        close
      </button>
    </section>
  );
}
