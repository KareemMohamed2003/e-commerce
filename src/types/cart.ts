import { ReactNode } from 'react';


// cart props

export interface CartSliceProps {
   isItemChanged: boolean | null;
   isItemPending: boolean | null;
   itemPending: boolean | null;
   cart: CartItemProps[];
   message: string | null;
   checkout?: boolean;
}

export interface CartItemProps {
   id: string;
   imageTitle: string;
   imageUrl: string;
   price: number;
   quantity: number;
   category: string;
   dispatch?: React.Dispatch<any>;

}


export interface CartProps {
   cart: CartItemProps[] | ReactNode | [];
   displayCheckoutModal: boolean;
}


type cartActionType = "loading" | 'empty' | 'loaded' | 'loading Transaction' | 'checkout'
export interface cartAction {
   type: cartActionType;
   payload?: CartItemProps[];
}
