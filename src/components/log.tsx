import { eCommerceAuth } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function CheckAuth() {
  onAuthStateChanged(eCommerceAuth, (user) => {
    console.log("the user : ");
    console.log(user);
  });
  // we can probably check auth in this component
  console.log("log component mounted at root path");
  return <div></div>;
}
