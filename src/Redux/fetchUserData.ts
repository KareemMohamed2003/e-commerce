import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { QueryExtraOptions } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export const userData = createApi({
  reducerPath: 'userData',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://e-commerce-cbe7c-default-rtdb.firebaseio.com/users',
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getUserData: builder.query<any, any>({
      query: (name: string | null) => `${name}`,
    }),
  }),
});

export const { useGetUserDataQuery } = userData;
