import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
     isItemChanged: false
   , isItemPending: null
   , itemPending: null
   , operationStatus: null
   , cart: []
}
export const cartSlice: any = createSlice({
   name: "CartSlice",
   reducers: {

      resetCart: (state, action) => {
         return initialState
      }
      , checkout: (state, action) => {

         return {

            checkout: true
            , message: action.payload,

            ...initialState,
            isItemPending: true
         }
      },

      pendingItem: (state, action) => {

         if (action.payload === "pending")// this was action.payload.status==="pending" 

            return {
               ...state,
               isItemPending: true, isItemChanged: false
            }

         else {

         }
      },
      dispatchCart: (state, action) => {
         if (action.payload.status === "success")  // this was action.payload.status==="success"
            return {
               ...state,
               isItemChanged: true
               , isItemPending: false
               , message: action.payload.message
            }
      }


      , terminateProcess: (state, action) => {
         if (action.payload === "terminate")
            return {
               ...state, isItemChanged: false
               , isItemPending: null
               , itemPending: null
               , operationStatus: null,
            }
      }
      , getCart: (state, action) => {
         const cart: any = action.payload
         
         return {
            ...state, cart
         }
      }

   },

   initialState
})


export const { resetCart, pendingItem, dispatchCart, checkout, terminateProcess, getCart } = cartSlice.actions
export default cartSlice.reducer;