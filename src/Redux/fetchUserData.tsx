import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userData = createApi({
   reducerPath: "userData",
   baseQuery: fetchBaseQuery({ baseUrl: "https://e-commerce-cbe7c-default-rtdb.firebaseio.com/users" }),
 refetchOnMountOrArgChange:true
 ,  endpoints: builder => ({
   
      getUserData: builder.query<any,any>({
         query: (name: string | null) =>`${name}`,
      })
   })
})


export const {useGetUserDataQuery}=userData