import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";


export const firebaseConfig = {

  apiKey: "AIzaSyBfDKxqoLMWIdM2CjV9-WAwnhux3XqGe9w",
  authDomain: "e-commerce-cbe7c.firebaseapp.com",
  databaseURL: "https://e-commerce-cbe7c-default-rtdb.firebaseio.com",
  projectId: "e-commerce-cbe7c",
  storageBucket: "e-commerce-cbe7c.appspot.com",
  messagingSenderId: "267503022813",
  appId: "1:267503022813:web:86bd892b8db60df8a6e134",
  measurementId: "G-MTF8L4DF2X"

};


export const app = initializeApp(firebaseConfig);

export const eCommerceDB = getDatabase(app)

export const eCommerceAuth = getAuth(app);

export const removeFromDB = (path, database) => {
  const refToRemove = ref(database, path)

  remove(refToRemove).then((el) => console.log(el))

}

export const writeToDB = (path, fields, database, signout) => {

  set(ref(database, path), fields).then((res) => {
    // console.log(res)
    
    if (signout) {

      eCommerceAuth.signOut()


    }

  }).catch(err => console.log(err));
  // get refereence to write to 

}


export const addUsertoFireBase = async (uid, userName, email, creationDate, database) => {
  // add user to E-commerce Database 
  const newUser = { userId: uid, cart: 0, favouriteItems: 0, username: userName, email: email, creationDate: creationDate }


  writeToDB(`users/${uid}`, newUser, database)

  const usersRef = ref(database, '/users');
  onValue(usersRef, (snapshot) => {
    const usersRes = snapshot.val();

    // console.log(usersRes)
    const newUsers = []
    for (const key in usersRes) {
      const user = usersRes[key];
      // console.log(user)
      newUsers.push(user)

    }

    // check if there is users in the Database 

    if (usersRes) {
      // if there are users already add  the new user to an Array and write it to the Database
      writeToDB("/customers", newUsers, database, true)

    }

    else {

      // if there is no users just add the user object to the location 
      writeToDB("/customers", newUser, database, true)

    }
  })

}

export const changeUsername = (email, password, username, createAccount, auth) => {
  // first we want to be able to use this function in the  login Page and the Register Page 
  // const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    if (createAccount) {
      updateProfile(auth.currentUser, {
        displayName: username
      }).then(() => { }).catch((error) => {
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
}

