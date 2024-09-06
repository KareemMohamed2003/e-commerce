import { ReactNode } from 'react';

// cart props

export interface CartSliceProps {
   isItemChanged: boolean | null;
   isItemPending: boolean | null;
   itemPending: boolean | null;
   cart: [];
   message: string | null;
   checkout?: boolean;
}

export interface CartItemProps {
   id: string;
   itemName: string;
   itemImg: string;
   itemPrice: number;
   quantity: number;
   category: string;
   dispatch: React.Dispatch<any>;
}

export interface CartProps {
   cart: any[] | ReactNode;
   displayCheckoutModal: any;
}

export enum cartActionType {
   loading = 'loading',
   empty = 'empty',
   loaded = 'loaded',
   loading_Transaction = 'loading Transaction', //! !@!!
   checkout = 'checkout',
}
export interface cartAction {
   type: cartActionType;
   payload?: [];
}
