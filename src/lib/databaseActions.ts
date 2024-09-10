import { ref, set } from "firebase/database";
import { ProductProps } from "../types";
import { eCommerceDB, readFromDB, writeToDB } from "./firebase";
import { extractCategories, generateProductId } from "./helpers";

/**
 * remaps products array  into a object with each of  the `category` , `subCategories` as `keys`
 * and the products for each categories as as an Array `value`
 * @param url
 */
export const remapProducts = async (url: string) => {
   // remap products with unqiue ids for each product this is a modified version
   const get = await fetch(url);
   const data = await get.json();
   console.log(data);
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
      videoGames: [],
   };
   console.log(products.electronics);



   data.map((el: ProductProps) => {
      let product;
      if (el?.subCategory) {
         el.subCategory.replace('/', '-');
         product = {
            ...el,
            subCategory: el.subCategory.replace('/', '-'),
            price: Math.floor(Math.random() * 100) + 20,
         };
         console.log(product);
      } else {
         product = {
            ...el,
            price: Math.floor(Math.random() * 100) + 20,
         };
      }
      // we can replace this with the extract categories function
      const { mainCategory: category, subCategory } = extractCategories(
         product?.subCategory ? product.subCategory : el.category
      );
      if (subCategory) {
         if (subCategory === 'security&surveillance') {
            products[category]['security_surveillance'].push({
               ...product,
               id: generateProductId(product?.subCategory!),
            });
         } else {
            products[category][subCategory].push({
               ...product,
               id: generateProductId(product?.subCategory!),
            });
         }
      } else {
         products[category!].push({
            ...product,
            id: generateProductId(el.category),
         });
      }
   });
   writeToDB('/products', products, eCommerceDB);
};


/**
 * removes `&` sign from `securityandSurvillence`  subCategory and `id ` with out any `&` sign  and assign new electronics object without `&` sign
 * @param products object
 */
export const replaceAnpersandFromCategory = async () => {
   const data: ProductProps[] = await readFromDB(
      'products/electronics/security_surveillance',
      eCommerceDB
   );
   const sanitizedData = data.map((el) => {
      return {
         ...el,
         subCategory: el.subCategory!.replace('&', '_'),
         id: el.id.replace('&', '_'),
      };
   });
   console.log(sanitizedData);
   set(
      ref(eCommerceDB, '/products/electronics/security_surveillance'),
      sanitizedData
   );
};
