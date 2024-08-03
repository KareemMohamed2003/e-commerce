import { useRouteError } from "react-router-dom";
export default function RouteError() {
  const error: any = useRouteError();
  console.log(error);
  return <div>{error}</div>;
}
