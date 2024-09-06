import { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { eCommerceAuth } from '../firebase';
import { reduxPersistor } from '../../Redux/reduxStore';
export async function loader({ request }: LoaderFunctionArgs) {
  const currentPath = new URL(request.url).pathname;
  const authPromise = new Promise((resolve, reject) => {
    onAuthStateChanged(eCommerceAuth, (user) => {
      if (user) {
        resolve(user);
      } else {
        // clear redux store if there is no  logged in user
        reduxPersistor.purge();
        resolve(null);
      }
    })
  })

  // this file doesn't reach this line of code at all . it seems that there is something that is causing this to redirect
  const authenticatedUser = await authPromise;
  if (authenticatedUser && currentPath !== '/home') {
    return redirect('/home');
  }
  return {};
}
