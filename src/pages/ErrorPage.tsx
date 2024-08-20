import { useEffect, useState } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import styles from '../sass/error.module.scss';
export default function ErrorPage() {
  const error: any = useRouteError();
  const [errorMessage, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  useEffect(() => {
    if (error.statusText === "Not Found") {
      setError("page - Not Found");
    }
  }, []);
  return (
    <div id={styles.errorPage} >
      <h1>Oops!</h1>
      {errorMessage ? (
        <h1>{errorMessage}</h1>
      ) : (
        <h1>Sorry, an unexpected error has occurred.</h1>
      )}
      <button className={styles.errorBtn} onClick={() => navigate(-1)}>go back</button>
    </div>
  );
}
