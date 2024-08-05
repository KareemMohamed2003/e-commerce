import { onAuthStateChanged } from "firebase/auth";
import { eCommerceAuth } from "./firebase";
import { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
export async function loader({ request }: LoaderFunctionArgs) {
  const authPromise = new Promise((resolve, reject) => {
    onAuthStateChanged(eCommerceAuth, (user) => {
      if (user) {
        console.log(user);
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
  const authenticatedUser = await authPromise;
  console.log(authenticatedUser);
  if (authenticatedUser) {
    return redirect("/home");
  }
  return {};
}
