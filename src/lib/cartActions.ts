import {
  ref,
  onValue,
  child,
  DataSnapshot,
  update,
  remove,
  Database,
} from 'firebase/database';
import {
  getCart,
  pendingItem,
  dispatchCart,
  terminateProcess,
} from '../Redux/cartSlice';
import {
  removeFromDB,
  writeToDB,
  eCommerceDB,
  readFromDB,
  adminDB,
} from './firebase';
import { Auth } from 'firebase/auth';
import {
  dateFormatter,

  getCartTotal,
  mergeIdsToProducts,
} from './helpers';
import { AnyAction, Dispatch } from 'redux';
import Redux from "redux"
import { CartItemProps, userCredentials } from '../types';
import React from 'react';

export const sendTransaction = async (
  cartItems: CartItemProps[],
  auth: Auth,
  currentUserId: string
) => {
  try {
    removeFromDB(`/users/${currentUserId}/cart`, eCommerceDB);
    const total = getCartTotal(cartItems);
    const transactions = await readFromDB('/transactions', adminDB);
    const transactionRes = await transactions.json();
    const transactionDetails = {
      checkoutDate: dateFormatter.format(new Date()),
      purchasedItems: [...cartItems],
      username: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      total: total,
      userId: currentUserId,
    };
    if (transactionRes) {

      const fields = [...transactionRes, { ...transactionDetails }];
      await writeToDB('/transactions', fields, eCommerceDB);
      return true;
    } else {
      const fields = [
        {
          ...transactionDetails,
        },
      ];

      await writeToDB('/transactions', fields, eCommerceDB);

      return true;
    }
  } catch (error) {
    return false;
  }
};

export const makeCartTransaction = async (
  dispatchToStore: Dispatch<AnyAction>,
  message: string,
  cartItems: CartItemProps[]
) => {
  const cart = mergeIdsToProducts(cartItems ? cartItems : []);
  dispatchToStore(pendingItem('pending'));
  console.log('makeCart Transaction message', message);
  checkCartItemTransaction(200, dispatchToStore, message);
  dispatchToStore(getCart(cart ? cart : []));
};

export const checkCartItemTransaction = (
  status: number,
  dispatchToStore: Dispatch<AnyAction>,
  message: string
) => {
  if (status === 200) {
    dispatchToStore(dispatchCart({ status: 'success', message: message }));
    setTimeout(() => {
      dispatchToStore(terminateProcess('terminate'));
    }, 3000);
  } else {
    console.log('transaction failed');
  }
};

export const addItemToCart = async (
  item: CartItemProps,
  userId: string,
  dispatchToStore: Redux.Dispatch<AnyAction>,
  dispatch?: React.Dispatch<any>
) => {
  console.log(item.quantity);

  dispatch && dispatch({ type: 'loading' });
  const cartRef = ref(eCommerceDB, `/users/${userId}/cart/${item.id}`);
  let itemQuantity = await readFromDB(
    `/users/${userId}/cart/${item.id}`,
    eCommerceDB
  );

  const quantity: number = itemQuantity?.quantity
    ? itemQuantity.quantity + item.quantity
    : item.quantity++;
  await update(cartRef, {
    ...item,
    quantity: quantity,
  });

  onValue(
    ref(eCommerceDB, `/users/${userId}/cart`),
    (snapshot: DataSnapshot) => {
      const newProducts = snapshot.val();
      makeCartTransaction(dispatchToStore, 'item added to cart', newProducts);
    },
    { onlyOnce: true }
  );
};

export const deleteItem = async (
  productId: string,
  userId: string,
  dispatchToStore: Dispatch<AnyAction>,
  dispatch?: React.Dispatch<any>
) => {
  dispatch && dispatch({ type: 'loading' });
  const cartRef = ref(eCommerceDB, `/users/${userId}/cart`);
  remove(child(cartRef, `/${productId}`));
  onValue(
    cartRef,
    (snapshot) => {
      const newProducts = snapshot.val();
      makeCartTransaction(
        dispatchToStore,
        'item removed from cart',
        newProducts
      );
    },

    { onlyOnce: true }
  );
};

export const decrementItem = async (
  item: CartItemProps,
  userId: string,
  dispatchToStore: Dispatch<AnyAction>,
  dispatch: React.Dispatch<any>
) => {
  dispatch && dispatch({ type: 'loading' });
  const cartRef = ref(eCommerceDB, `/users/${userId}/cart`);
  const childRef = child(cartRef, `/${item.id}`);
  if (item.quantity === 1) {
    remove(childRef);
  } else {
    const newItem = { ...item };
    newItem.quantity--;
    update(childRef, newItem);
  }
  onValue(
    cartRef,
    (snapshot) => {
      const items = snapshot.val();
      console.log('decrementItems', items);
      makeCartTransaction(dispatchToStore, 'item removed from cart', items);
    },
    {
      onlyOnce: true,
    }
  );
};

export const addUserEntry = async (
  check: string,
  userData: userCredentials,
  database: Database
) => {
  readFromDB('/activites', adminDB);
  const exisitingActivites = await readFromDB('/activites', adminDB);
  let userEntry = {};
  if (check === 'checkIn') {
    userEntry = {
      signedInAt: dateFormatter.format(new Date()),
      username: userData?.username,
      email: userData?.email,
    };
  } else {
    userEntry = {
      signedOutAt: dateFormatter.format(new Date()),
      username: userData?.username,
      email: userData?.email,
    };
  }

  if (exisitingActivites) {
    writeToDB('/activites', [...exisitingActivites, userEntry], database);
  } else {
    writeToDB('/activites', [userEntry], database);
  }
};

