import { ref, onValue, child, DataSnapshot, update, remove, } from "firebase/database";
import {
  getCart,
  pendingItem,
  dispatchCart,
  terminateProcess,
} from "../Redux/cartSlice";
import { removeFromDB, writeToDB, eCommerceDB, readFromDB, adminDB } from "./firebase";
import { Auth } from "firebase/auth";
import { dateFormatter, extractCategories, generateProductId, getCartTotal, mergeIdsToProducts } from "./helpers";


export const sendTransaction = async (
  cartItems: [],
  auth: Auth,
  currentUserId: string,
) => {
  try {

    removeFromDB(`/users/${currentUserId}/cart`, eCommerceDB);
    const total = getCartTotal(cartItems);
    const transactions = await readFromDB("/transactions", adminDB)
    const transactionRes: any = await transactions.json();
    const transactionDetails = {
      checkoutDate: dateFormatter.format(new Date()),
      purchasedItems: [...cartItems],
      username: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      total: total,
      userId: currentUserId,
    }
    if (transactionRes) {
      // transactionRes is an Array   in transactions i don't wanna to have to fetch the 
      // transactions and then insert the old transaction to an Array i wanna just 
      // push them to the transactions location 
      const fields = [
        ...transactionRes,
        { ...transactionDetails }
      ];
      await writeToDB("/transactions", fields, eCommerceDB);
      return true;
    } else {
      const fields = [
        {
          ...transactionDetails
        },
      ];

      await writeToDB("/transactions", fields, eCommerceDB);

      return true;
    }

  } catch (error) {
    return false;
  }

};


export const makeCartTransaction = async (
  dispatchToStore: any,
  message: string,
  cartItems: any,
) => {
  const cart = mergeIdsToProducts(cartItems ? cartItems : [])
  dispatchToStore(pendingItem("pending"));
  console.log("makeCart Transaction message", message)
  checkCartItemTransaction(200, dispatchToStore, message);
  dispatchToStore(getCart(cart ? cart : []));

};

export const checkCartItemTransaction = (
  status: number,
  dispatchToStore: any,
  message: string,
) => {
  if (status === 200) {
    dispatchToStore(dispatchCart({ status: "success", message: message }));

    // debugger;
    setTimeout(() => {
      dispatchToStore(terminateProcess("terminate"));
    }, 3000);
  } else {
    console.log("transaction failed");

  }
};

export const addItemToCart = async (
  item: any,
  userId: string,
  dispatchToStore: any,
  dispatch?: any,
) => {
  console.log(item.quantity)
  dispatch && dispatch({ type: "loading" });
  const cartRef = ref(eCommerceDB, `/users/${userId}/cart/${item.id}`)
  let itemQuantity = await readFromDB(`/users/${userId}/cart/${item.id}`, eCommerceDB)
  console.log(itemQuantity)
  console.log()
  const quantity: number = itemQuantity?.quantity ? itemQuantity.quantity + item.quantity : item.quantity++;
  await update(cartRef, {
    ...item,
    quantity: quantity
  })

  onValue(
    ref(eCommerceDB, `/users/${userId}/cart`),
    (snapshot: DataSnapshot) => {
      const newProducts = snapshot.val();
      makeCartTransaction(dispatchToStore, "item added to cart", newProducts);
    }, { onlyOnce: true },
  );
};



export const deleteItem = async (
  productId: string,
  userId: string,
  dispatchToStore: any,
  dispatch?: any,
) => {
  dispatch && dispatch({ type: "loading" });
  const cartRef = ref(eCommerceDB, `/users/${userId}/cart`)
  remove(child(cartRef, `/${productId}`))
  onValue(cartRef, (snapshot) => {
    const newProducts = snapshot.val()
    makeCartTransaction(
      dispatchToStore,
      "item removed from cart",
      newProducts,
    );
  },

    { onlyOnce: true }
  )

};

export const decrementItem = async (
  item: any,
  userId: string,
  dispatchToStore: any,
  dispatch: any,
) => {

  dispatch && dispatch({ type: "loading" });
  const cartRef = ref(eCommerceDB, `/users/${userId}/cart`);
  const childRef = child(cartRef, `/${item.id}`)
  if (item.quantity === 1) {
    remove(childRef)
  }
  else {
    update(childRef, {
      quantity: item.quantity--,
      ...item
    })
  }
  onValue(
    cartRef,
    (snapshot) => {
      const items = snapshot.val();
      console.log("decrementItems", items);
      makeCartTransaction(
        dispatchToStore,
        "item removed from cart",
        items,
      );
    },
    {
      onlyOnce: true,
    },
  );
};

export const addUserEntry = async (
  check: any,
  userData: any,
  database: any,
) => {
  readFromDB("/activites", adminDB)
  const exisitingActivites = await readFromDB("/activites", adminDB)
  let userEntry = {};
  if (check === "checkIn") {
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
    writeToDB("/activites", [...exisitingActivites, userEntry], database);
  } else {
    writeToDB("/activites", [userEntry], database);
  }
};

/**
 * remaps products array  into a object with each of  the `category` , `subCategories` as `keys` 
 * and the products for each categories as as an Array `value`
 * @param url 
 */
export const remapProducts = async (url: any) => {
  // remap products with unqiue ids for each product this is a modified version 
  const get = await fetch(url)
  const data = await get.json()
  console.log(data)
  const products: any = {
    electronics: {
      cameras: [],
      headphones: [],
      security_surveillance: [],
      vehicleElectronics: [],
    },
    menFashion: {
      accessories: [],
      clothing: [],
      shoes: [],
      watches: [],
    },
    womenFashion: {
      accessories: [],
      clothing: [],
      shoes: [],
      handbags: [],
    },
    dataStorage: [],
    books: [],
    computerPerpherials: [],
    videoGames: []
  };
  console.log(products.electronics)

  data.map((el: any) => {
    let product
    if (el?.subCategory) {
      el.subCategory.replace("/", "-")
      product = {
        ...el, subCategory: el.subCategory.replace("/", "-"),
        price: Math.floor(Math.random() * 100) + 20
      }
      console.log(product)
    }
    else {
      product = {
        ...el, price: Math.floor(Math.random() * 100) + 20
      };
    }
    // we can replace this with the extract categories function 
    const { mainCategory: category, subCategory } = extractCategories(product?.subCategory ? product.subCategory : el.category)
    if (subCategory) {

      if (subCategory === "security&surveillance") {
        products[category]["security_surveillance"].push({ ...product, id: generateProductId(product?.subCategory) })
      } else {
        products[category][subCategory].push({ ...product, id: generateProductId(product?.subCategory) })
      }

    }
    else {
      products[category!].push({ ...product, id: generateProductId(el.category) })
    }

  });
  writeToDB("/products", products, eCommerceDB)
};

