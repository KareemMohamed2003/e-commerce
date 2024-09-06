import { onAuthStateChanged } from 'firebase/auth';
import { redirect } from 'react-router-dom';
import { eCommerceAuth } from '../firebase';
import { getUserIdFromStorage } from '../helpers';
import { reduxPersistor } from '../../Redux/reduxStore';
export async function loader() {
  const storedUser = getUserIdFromStorage();
  const authPromise = new Promise((resolve, reject) => {
    onAuthStateChanged(eCommerceAuth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reduxPersistor.purge();
        resolve(null);

      }
    });
  });
  const authenticatedUser = await authPromise;
  console.log(authenticatedUser);
  if (authenticatedUser && storedUser) {
    return redirect('/home');
  }
  return {};
}
