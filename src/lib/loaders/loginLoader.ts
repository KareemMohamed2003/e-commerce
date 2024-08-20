import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "react-router-dom";
import { eCommerceAuth } from "../firebase";
import { getUserIdFromStorage } from "../helpers";
export async function loader() {
  const storedUser = getUserIdFromStorage();
  const authPromise = new Promise((resolve, reject) => {
    onAuthStateChanged(eCommerceAuth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
  const authenticatedUser = await authPromise;
  console.log(authenticatedUser);
  if (authenticatedUser && storedUser) {
    return redirect("/home");
  }
  return {};
}
