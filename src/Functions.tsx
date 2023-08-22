
import { ref, set, onValue } from "firebase/database";
import { getCart, pendingItem, dispatchCart, terminateProcess } from "./Redux/CartSlice"
import {  removeFromDB, writeToDB, eCommerceDB } from "./firebase";


export const dateFormatter = Intl.DateTimeFormat("en-us", {

   timeStyle: "long",
   dateStyle: "long"
});
// cart functions
export const getCartTotal = (cart: any[]) => {

   const itemsTotal: number[] = []// we have the number 

   cart.map(el => {

      const currentItemTotal = el.quantity * el.price
      itemsTotal.push(currentItemTotal)

   })

   const total = itemsTotal.reduce((acc: number, curr: number) => (acc + curr), 0)
   // console.log(total)
   return total;
}


export const sendTransaction = async (cartItems: any, auth: any, currentUserId: string) => {

   const total = getCartTotal(cartItems.cart)
   const getTransaction = await fetch("https://admin-dashboard-f3c0a-default-rtdb.firebaseio.com/transactions.json")
   const transactionRes: any = await getTransaction.json();

   if (transactionRes) {
      const fields = [...transactionRes, { checkoutDate: dateFormatter.format(new Date()), purchasedItems: [...cartItems.cart], username: auth.currentUser?.displayName, email: auth.currentUser?.email, total: total, userId: currentUserId }]
      writeToDB("/transactions", fields, eCommerceDB)
  
   }

   else {
      const fields = [{ checkoutDate: dateFormatter.format(new Date()), purchasedItems: [...cartItems.cart], username: auth.currentUser?.displayName, email: auth.currentUser?.email, total: total, userId: currentUserId }]
      writeToDB("/transactions", fields, eCommerceDB)
      
   }

   // delete the cart in the Database 
   removeFromDB(`/users/${currentUserId}/cart`, eCommerceDB);

}
// cart Item functions 

export const makeCartTransaction = async (dispatchToStore: any, message: string, userId: string, cartItems: any, cart?: any, location: string = "cart") => {
   // console.log(cart,cartItems)
   set(ref(eCommerceDB, `/users/${userId}/${location}`), cartItems).then(() => {
      dispatchToStore(pendingItem("pending"))
      // const status = sendItem.status 
      checkCartItemTransaction(200, dispatchToStore, message)
      dispatchToStore(getCart(cartItems))

   })

}


export const checkCartItemTransaction = (status: number, dispatchToStore: any, message: string) => {
 
   if (status === 200) {

      dispatchToStore(dispatchCart({ status: "success", message: message }))

      setTimeout(() => {

         dispatchToStore(terminateProcess("terminate"))

      }, 3000);
   }

   else {
      console.log("transaction failed")
   }

}

export const addItemToCart = async (item: any, userId: string, dispatchToStore: any) => {
   // console.log(userId)
   // console.log(item)

   const cartRef = ref(eCommerceDB, `/users/${userId}/cart`);
   onValue(cartRef, (snapshot: any) => {
      // read from the database check if the item we are adding to the cart already exists or not 
      const items = snapshot.val();
   
      if (items) {
         // console.log(items)
         const existingItem = items.find((el: any) => el.imageTitle === item.imageTitle)

         if (existingItem) {
            // console.log(existingItem)
            
            const newItem = { quantity: existingItem.quantity++, ...existingItem }
            const existingItemIndex = items.findIndex((el: any) => el.imageTitle === existingItem.imageTitle)
            items[existingItemIndex] = newItem
            makeCartTransaction(dispatchToStore, "item added to cart", userId, [...items], items)
       
         }

         else {

            makeCartTransaction(dispatchToStore, "item added to cart", userId, [item, ...items], items)

         }

      }

      else {
         makeCartTransaction(dispatchToStore, "item added to cart", userId, [item], item)

      }

   },{
      onlyOnce:true
   });

}

export const checkCartSize = async (items: any, userId: string, dispatchToStore: any) => {

   if (items.length === 0) {

      writeToDB(`/users/${userId}/cart`, false, eCommerceDB)
      makeCartTransaction(dispatchToStore, "item removed from cart", userId, items, items)
   }

   else {

      makeCartTransaction(dispatchToStore, "item removed from cart", userId, items, items)

   }
}

export const deleteItem = async (Item: any, userId: string, dispatchToStore: any) => {
   const getItems = await fetch(`https://e-commerce-cbe7c-default-rtdb.firebaseio.com/users/${userId}/cart.json`)
   const items: {}[] = await getItems.json();

   if (items) {
      const ItemIndex = items.findIndex((el: any) => el.imageTitle === Item.imageTitle)
      items.splice(ItemIndex, 1)
      // console.log(items)
      makeCartTransaction(dispatchToStore, "item removed from cart", userId, items, items)

   }

}


export const decrementItem = async (Item: any, userId: string, dispatchToStore: any) => {

   const cartRef = ref(eCommerceDB, `/users/${userId}/cart`);
   onValue(cartRef, (snapshot) => {
      const items = snapshot.val();
      // console.log(items)
 
      if (items) {

         const ItemIndex = items?.findIndex((el: any) => el.imageTitle === Item.imageTitle)

         if (Item.quantity > 1) {
            // console.log("quantity is more than one");
            const newItem = { quantity: Item.quantity--, ...Item };
            items[ItemIndex] = newItem;

            makeCartTransaction(dispatchToStore, "item removed from cart", userId, items, items)
         }

         else {

            // console.log("item is zero")
            items.splice(ItemIndex, 1)
            checkCartSize(items, userId, dispatchToStore)

         }
      }

   },{
      onlyOnce:true
   });

}
