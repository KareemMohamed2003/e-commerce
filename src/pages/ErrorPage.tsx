import { useEffect, useState } from "react";
import { useRouteError, ErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.log(error);
  const [errorMessage, setError] = useState<string | null>(null)

  useEffect(() => {
    if (error.statusText === "Not Found") {
      setError("page - Not Found")
    }

  }, [])
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      {errorMessage ? <h1>
        {errorMessage}
      </h1> : <h1>Sorry, an unexpected error has occurred.</h1>}
      <p>{/* <i>{error?.statusText || error?.message}</i> */}</p>
    </div>
  );
}


