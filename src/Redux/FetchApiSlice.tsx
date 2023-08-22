
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export   const  firebaseData = createApi({
   reducerPath: "EcommerceProducts",
   baseQuery: fetchBaseQuery({ baseUrl: "https://e-commerce-cbe7c-default-rtdb.firebaseio.com/" }),
   endpoints: builder => ({
      getProductsData: builder.query<any,any>({
         query: (name: string | null) =>`${name}`
      })
   })
})

// console.log(firebaseData)
export const {useGetProductsDataQuery}=firebaseData