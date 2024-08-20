import { v4 } from "uuid";
import { eCommerceDB, readFromDB } from "./firebase";
import { set, ref } from "firebase/database";

export const dateFormatter = Intl.DateTimeFormat("en-us", {
   timeStyle: "long",
   dateStyle: "long",
});

/**
 * @param obj 
 * @returns true if object  length is not zero otherwise false
 */
export const isObjLength = (obj: any) => Boolean(Object.keys(obj).length)
/**
 *  resolves provided path to  product url  that the user can navigate to , we need this because if
 *  the user is on home page the product url will differ compared to if we were in selectedCategory page 
 * 
 * @param path 
 * @param url 
 * @returns 
 */
export const resolvePath = (path: string, url: string) => {
   if (path === "/home") {
      return url
   }
   return "../" + url;
}

export const generateProductId = (category: string) => {
   return `${category}-${v4()}`
}

export const selectProduct = (products: [], id: string) => {
   return products.find((el: any) => el.id === id)
}

export const getUserIdFromStorage = () => {
   const storage = localStorage.getItem("persist:root");
   if (!storage) return null;
   const storedData = JSON.parse(storage!);
   const storedUser = JSON.parse(storedData.user)?.userId;
   if (!storedUser) return null;
   return storedUser;
};

/**
 * takes a category string extracts mainCategory and subCategory if there is 
 * @param category 
 * @returns an object with mainCategory , subCategory if it exists  otherwise it returns subCategory as  null
 */
export const extractCategories = (category: string | null) => {
   console.log(category)
   let mainCategory, subCategory;
   if (category!.includes("-")) {
      const sliceIndex = category!.indexOf("-");
      mainCategory = category!.slice(0, sliceIndex);
      subCategory = category!.slice(sliceIndex + 1);
      return { subCategory, mainCategory };
   }
   mainCategory = category;
   return { mainCategory, subCategory: null }
}
/**
 * merges product id `key` into the product object `value` pair
 * @param products object containing product objects with key as the id and the  product as value
 * @returns array of objects with merged ids
 */
export const mergeIdsToProducts = (products: {}) => {
   // console.log(products)
   const appendedIdsToItems: {}[] = []
   const entries = Object.entries(products)
   entries.map((el: any) =>
      appendedIdsToItems.push({ ...el[1], id: el[0] })
   )
   return appendedIdsToItems;
}


/**
 * returns an array of products based on the selected category
 * @param state 
 * @param category 
 * @returns 
 */
export const filterCategories = (state: any, category: string) => {
   const products = state.products.products;
   let selectedProducts;
   const { mainCategory, subCategory } = extractCategories(category)
   if (subCategory) return selectedProducts = products[mainCategory][subCategory];
   selectedProducts = products[category];
   return selectedProducts;
};

/**
 * estimate the amount of space used by data stored in the browser's localStorage
 * @returns space used by data
 */
const localStorageSpace = function () {
   var allStrings = "";
   for (var key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
         allStrings += window.localStorage[key];
      }
   }
   return allStrings
      ? 3 + (allStrings.length * 16) / (8 * 1024) + " KB"
      : "Empty (0 KB)";
};

export const getCartTotal = (cart: any[]) => {
   if (cart instanceof Array) {
      if (cart.length === 0) return 0;
      const itemsTotal: number[] = [];
      cart.map((el) => {
         const currentItemTotal = el.quantity * el.price;
         itemsTotal.push(currentItemTotal);
      });
      const total = itemsTotal.reduce((acc: number, curr: number) => acc + curr, 0);
      return total;
   }
   return null;
};


/**
 * selects random products.
 * @param products - The  products object.
 * @returns the array of random products.
 */
export const selectRandomProducts = (products: any) => {
   const randomProducts: any = [];
   const keys = Object.keys(products);
   const random = (key: any) => Math.floor(Math.random() * key.length);
   const isArray = (currentObj: any) => currentObj instanceof Array;
   for (let i = 0; i < 6; i++) {
      keys.filter((key) => key !== "books").map((key) => {
         const currentCategory = products[key];
         if (isArray(currentCategory)) {
            const randomProduct = currentCategory[random(currentCategory)]
            randomProducts.push(randomProduct);
            ++i;
         }
         else {
            const nestedKeys = Object.keys(currentCategory)
            for (let k = 0; k < nestedKeys.length; k++) {
               let current = nestedKeys[k];
               const nestedRandomProduct = currentCategory[current][random(currentCategory[current])]
               randomProducts.push(nestedRandomProduct);
               i++;
               break;
            }
         }
      })
   }
   return randomProducts;
}
/**
 * removes `&` sign from `securityandSurvillence`  subCategory and `id ` with out any `&` sign  and assign new electronics object without `&` sign
 * @param products object
 */
export const replaceAnpersandFromCategory = async () => {
   const data: any[] = await readFromDB("products/electronics/security_surveillance", eCommerceDB)
   const sanitizedData = data.map(el => {
      // find index of & persand replace it with a underscore
      // console.log(el.subCategory.replace("&", "_"))
      // console.log(el.id.replace("&", '_'))
      return {
         ...el, subCategory: el.subCategory.replace("&", "_"),
         id: el.id.replace("&", "_")
      }

   })
   console.log(sanitizedData)
   set(ref(eCommerceDB, "/products/electronics/security_surveillance"), sanitizedData)
   // console.log(data)
   // fetch the electronics category 
   // we need to change the subcategoryu and the ids remove the `&` from them 
}