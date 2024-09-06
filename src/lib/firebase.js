import { initializeApp } from 'firebase/app';
import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue, remove, get } from 'firebase/database';
import { getError } from '../Redux/userDataSlice';
export const firebaseConfig = {
  apiKey: 'AIzaSyBfDKxqoLMWIdM2CjV9-WAwnhux3XqGe9w',
  authDomain: 'e-commerce-cbe7c.firebaseapp.com',
  databaseURL: 'https://e-commerce-cbe7c-default-rtdb.firebaseio.com',
  projectId: 'e-commerce-cbe7c',
  storageBucket: 'e-commerce-cbe7c.appspot.com',
  messagingSenderId: '267503022813',
  appId: '1:267503022813:web:86bd892b8db60df8a6e134',
  measurementId: 'G-MTF8L4DF2X',
};
export const adminConfig = {
  apiKey: 'AIzaSyCcz0W7uw0FsQoJkSlGKQCOKf2fUBRtSuQ',
  authDomain: 'admin-dashboard-f3c0a.firebaseapp.com',
  databaseURL: 'https://admin-dashboard-f3c0a-default-rtdb.firebaseio.com',
  projectId: 'admin-dashboard-f3c0a',
  storageBucket: 'admin-dashboard-f3c0a.appspot.com',
  messagingSenderId: '161010642887',
  appId: '1:161010642887:web:1a49ef59c42a341316f3e2',
  measurementId: 'G-9M70LENJSW',
};
export const app = initializeApp(firebaseConfig);
export const adminApp = initializeApp(adminConfig, 'adminApp');
export const eCommerceDB = getDatabase(app);
export const adminDB = getDatabase(adminApp);
export const eCommerceAuth = getAuth(app);

export const removeFromDB = (path, database) => {
  const refToRemove = ref(database, path);
  remove(refToRemove).then((el) => console.log(el));
};

/**
 * overwrites data at the specified location
 * @param  path
 * @param  fields
 * @param  database
 */
export const writeToDB = async (path, fields, database) => {
  set(ref(database, path), fields)
    .then(() => true)
    .catch((err) => console.log(err));
};

/**
 *
 * @param path
 * @param  database
 * @returns data from given location
 * @returns null if there is no data
 */
export const readFromDB = async (path, database) => {
  // console.log("ref object firebase,", ref(database, path))
  const data = await get(ref(database, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    })
    .catch((err) => err);

  return data;
};
export const addUsertoFireBase = async (
  uid,
  userName,
  email,
  creationDate,
  database
) => {
  // add user to E-commerce Database
  const newUser = {
    userId: uid,
    cart: [],
    favouriteItems: 0,
    username: userName,
    email: email,
    creationDate: creationDate,
  };

  writeToDB(`users/${uid}`, newUser, database);
  const usersRef = ref(database, '/users');
  onValue(usersRef, (snapshot) => {
    const usersRes = snapshot.val();
    const newUsers = [];
    for (const key in usersRes) {
      const user = usersRes[key];
      newUsers.push(user);
    }
    // check if there is users in the Database
    if (usersRes) {
      console.log(usersRes);
      // if there are users already add  the new user to an Array and write it to the Database
      writeToDB('/customers', newUsers, database).then(() =>
        eCommerceAuth.signOut()
      );
    } else {
      // if there is no users just add the user object to the location
      writeToDB('/customers', newUser, database).then(() =>
        eCommerceAuth.signOut()
      );
    }
  });
};

export const changeUsername = (
  email,
  password,
  username,
  createAccount,
  auth
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (createAccount) {
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {})
          .catch((error) => {
            // console.log(error)
          });
      }

      return user.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode)
      // console.log(errorMessage)
    });
};
export const login = async (
  email,
  password,
  auth,
  setLoading,
  dispatchToStore,
  setUserCredentials
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUserCredentials({
        username: user.displayName,
        id: user.uid,
        email: user.email,
      });
      setLoading(false);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      dispatchToStore(getError({ errorCode: errorCode.split('/')[1] }));
    })
    .then((user) => user);
};
