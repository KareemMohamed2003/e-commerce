import { v4 } from 'uuid';
import { eCommerceDB, readFromDB } from './firebase';
import { set, ref } from 'firebase/database';
import { categories } from '../types';



export const dateFormatter = Intl.DateTimeFormat('en-us', {
  timeStyle: 'long',
  dateStyle: 'long',
});

/**
 * @param obj
 * @returns true if object  length is not zero otherwise false
 */
export const isObjLength = (obj: any) => Boolean(Object.keys(obj).length);
/**
 *  resolves provided path to  product url  that the user can navigate to , we need this because if
 *  the user is on home page the product url will differ compared to if we were in selectedCategory page
 * @param path
 * @param url
 * @returns
 */
export const resolvePath = (path: string, url: string) => {
  if (path === '/home') {
    return url;
  }
  return '../' + url;
};

export const generateProductId = (category: string) => {
  return `${category}-${v4()}`;
};

export const selectProduct = (products: [], id: string) => {
  return products.find((el: any) => el.id === id);
};

export const getUserIdFromStorage = () => {
  const storage = localStorage.getItem('persist:root');
  if (!storage) return null;
  const storedData = JSON.parse(storage!);
  const storedUser = JSON.parse(storedData.user)?.userId;
  if (!storedUser) return null;
  return storedUser;
};

/**
 * takes a category string extracts mainCategory and subCategory if there is
 * @param category  string
 * @returns an object with mainCategory string , subCategory string if it exists  otherwise it returns subCategory as  null
 */


export const extractCategories = (category: string): categories => {
  console.log(category);
  let mainCategory, subCategory;
  if (category!.includes('-')) {
    const sliceIndex = category!.indexOf('-');
    mainCategory = category!.slice(0, sliceIndex);
    subCategory = category!.slice(sliceIndex + 1);
    return { subCategory, mainCategory };
  }
  mainCategory = category;
  return { mainCategory, subCategory: null };
};
/**
 * merges product id `key` into the product object `value` pair
 * @param products object containing product objects with key as the id and the  product as value
 * @returns array of objects with merged ids
 */
export const mergeIdsToProducts = (products: {}) => {
  // console.log(products)
  const appendedIdsToItems: {}[] = [];
  const entries = Object.entries(products);
  entries.map((el: any) => appendedIdsToItems.push({ ...el[1], id: el[0] }));
  return appendedIdsToItems;
};

/**
 * returns an array of products based on the selected category
 * @param state
 * @param category
 * @returns
 */
export const filterCategories = (state: any, category: string) => {
  const products = state.products.products;
  let selectedProducts;
  const { mainCategory, subCategory } = extractCategories(category);
  if (subCategory)
    return (selectedProducts = products[mainCategory][subCategory]);
  selectedProducts = products[category];
  return selectedProducts;
};

/**
 * estimate the amount of space used by data  stored in the browser's localStorage
 * @returns space used in kilobytes
 */
const localStorageSpace = function () {
  var allStrings = '';
  for (var key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      allStrings += window.localStorage[key];
    }
  }
  return allStrings
    ? 3 + (allStrings.length * 16) / (8 * 1024) + ' KB'
    : 'Empty (0 KB)';
};

export const getCartTotal = (cart: any[]) => {
  if (cart instanceof Array) {
    if (cart.length === 0) return 0;
    const itemsTotal: number[] = [];
    cart.map((el) => {
      const currentItemTotal = el.quantity * el.price;
      itemsTotal.push(currentItemTotal);
    });
    const total = itemsTotal.reduce(
      (acc: number, curr: number) => acc + curr,
      0
    );
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
    keys
      .filter(
        (key) =>
          key !== 'books' &&
          key !== 'computerPerpherials' &&
          key !== 'dataStorage'
      )
      .map((key) => {
        const currentCategory = products[key];
        if (isArray(currentCategory)) {
          const randomProduct = currentCategory[random(currentCategory)];
          randomProducts.push(randomProduct);
          ++i;
        } else {
          const nestedKeys = Object.keys(currentCategory);
          for (let k = 0; k < nestedKeys.length; k++) {
            let current = nestedKeys[k];
            const nestedRandomProduct = currentCategory[current][random(currentCategory[current])];
            randomProducts.push(nestedRandomProduct);
            i++;
            break;
          }
        }
      });
  }
  return randomProducts;
};
/**
 * removes `&` sign from `securityandSurvillence`  subCategory and `id ` with out any `&` sign  and assign new electronics object without `&` sign
 * @param products object
 */
export const replaceAnpersandFromCategory = async () => {
  const data: any[] = await readFromDB(
    'products/electronics/security_surveillance',
    eCommerceDB
  );
  const sanitizedData = data.map((el) => {
    return {
      ...el,
      subCategory: el.subCategory.replace('&', '_'),
      id: el.id.replace('&', '_'),
    };
  });
  console.log(sanitizedData);
  set(
    ref(eCommerceDB, '/products/electronics/security_surveillance'),
    sanitizedData
  );
};

/**
 iterates over products  state object and pushes the element of each category and subCategory into 
 an Array and returns the Array 
@returns array of products
 */
export const toArray = (products: any) => {
  const productsArr = [];
  for (const key in products) {
    if (products[key] instanceof Array === false) {
      for (const nestedkey in products[key]) {
        for (const nestedObj of products[key][nestedkey]) {
          productsArr.push(nestedObj);
        }
      }
    } else {
      for (const product of products[key]) productsArr.push(product);
    }
  }
  return productsArr;
};

/**
 * searches products by either full product name or finds all products that their has first character matching the one the user entered
 * @param keyword
 * @param products
 * @returns array of results , null if no results found
 */
export const searchProduct = (keyword: string, products: any): [] | null => {
  const results = products?.filter((el: any) => {
    const regex = new RegExp(keyword, 'i');
    return (
      el.imageTitle[0] === keyword ||
      el.imageTitle === keyword ||
      regex.test(el.imageTitle)
    );
  });
  if (!results.length) return null;
  return results;
};



export const paginateProducts = (products: any[], pageNum: number) => {
  const endIndex = pageNum * 6; // assusme page number is 3 then the index should be   18
  const startIndex = endIndex - 6; // the start index should be the endIndex - whatever  elements in the current page
  return products.slice(startIndex, endIndex);

};

/**
 *
 * takes the number of products calculates how many pages required for 6 or less products in each page
 * @param productLen
 * @returns number of pages
 */
export const pagesNum = (productLen: number): number => {
  return Math.ceil(productLen / 6);
};

export const generatePages = (start: number, end: number) => {
  const pagesArr = Array.from(Array(end - start).keys());
  console.log(pagesArr)
  return [...pagesArr].map((el) => el + start);    // @tsignore
}
export const getPagesCut = (currentPage: number, totalPages: number, currentPagesCount: number) => {
  const limit = 5;
  let pageIndexes = { start: 0, end: 0 };
  if (totalPages < limit) {
    return pageIndexes = { start: 1, end: totalPages + 1 };
  }
  else if (currentPage >= 1 && currentPage <= 3) {
    return pageIndexes = { start: 1, end: limit + 1 }
  }
  else if (currentPage > 1 && currentPage + 2 <= totalPages) {
    return pageIndexes = { start: currentPage - 1, end: currentPage + 3 }
  }

  else {
    return { start: currentPage - 1, end: currentPage + 1 }
  }

}