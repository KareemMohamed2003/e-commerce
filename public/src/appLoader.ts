import { LoaderFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { eCommerceAuth } from "./firebase";
export async function loader({ request }: LoaderFunctionArgs) {
  const currentPath = new URL(request.url).pathname;
  const authPromise = new Promise((resolve, reject) => {
    console.log("promise");
    onAuthStateChanged(eCommerceAuth, (user) => {
      if (user) {
        // console.log(user)
        resolve(user);
      } else {
        // console.log("promise rejected")
        resolve(null);
      }
    });
  });
  // this file doesn't reach this line of code at all . it seems that there is something that is causing this to redirect
  const authenticatedUser = await authPromise;
  console.log(authenticatedUser);
  if (authenticatedUser && currentPath !== "/home") {
    return redirect("/home");
  }
  return {};
}
