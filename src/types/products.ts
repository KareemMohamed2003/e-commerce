

export interface ProductProps {
   imageUrl: string;
   imageTitle: string;
   price: number;
   id: string;
   category: string;
   subCategory?: string;
   index?: number;
}

export interface IproductSlice {
   books: ProductProps[];
   computerPerpherials: ProductProps[];
   dataStorage: ProductProps[];
   electronics: {
      cameras: ProductProps[];
      headphones: ProductProps[];
      security_surveillance: ProductProps[];
      vehicleElectronics: ProductProps[];
   };
   menFashion: {
      accessories: ProductProps[];
      clothing: ProductProps[];
      shoes: ProductProps[];
      watches: ProductProps[];
   };
   videoGames: ProductProps[];
   womenFashion: {
      accessories: ProductProps[];
      clothing: ProductProps[];
      handbags: ProductProps[];
      shoes: ProductProps[];
   };
};


export type mainCategories = keyof IproductSlice;

export type subCategories<T extends keyof mainCategories> =
   T extends 'electronics' ? keyof IproductSlice["electronics"] :
   T extends 'menFashion' ? keyof IproductSlice["menFashion"] :
   T extends 'womenFashion' ? keyof IproductSlice["womenFashion"] : never;

export type categories =
   "cameras"
   | "headphones"
   | "security_surveillance"
   | "vehicleElectronics"
   | "accessories"
   | "clothing"
   | "shoes"
   | "watches"
   | "accessories"
   | "clothing"
   | "handbags"
   | "shoes";
