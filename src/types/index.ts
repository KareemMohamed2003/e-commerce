import { Dispatch, ReactNode, SetStateAction } from "react"
export * from "./cart"
export interface LoginModalProps {
   setModalToggle: React.Dispatch<any>;
   setLoading: Dispatch<SetStateAction<boolean>>
}
// search component props
export type SearchMenu = {
   compact: boolean;
   fullScreen: boolean;
   toggle: boolean;
};

export interface SearchProps {
   productsArr: [];
   setSearchResults: Dispatch<SetStateAction<[] | null>>;
   searchResults: [] | null;
   searchMenu: SearchMenu;
   setSearchMenu: Dispatch<React.SetStateAction<SearchMenu>>;
}

export interface SearchBarProps {
   products: [];
   setSearchResults: React.Dispatch<React.SetStateAction<[] | null>>;
   setSearchMenu: Dispatch<SetStateAction<SearchMenu>>;
   searchResults: [] | null;
}

// pagination component props
export interface PaginationProps {
   productParam: string;
   totalPages: number;
   currentPage: number;
   setPaginatedResults: Dispatch<React.SetStateAction<[] | null>>;
   searchResults: [] | null;
}

// notification icon props 
export interface IconProps { icon: ReactNode, styling: string; }

// sidebar props 
export interface ISideBar {
   dispatch: any;
   electronics: string[];
   womenCategories: string[];
   menCategories: string[];
   productsState: any;
   setMenuToggle: any;
}

// product props 

export interface ProductProps {
   imageUrl: string;
   imageTitle: string;
   price: string;
   id: string;
   category: string;
   subCategory?: string;
   index?: number;
}


// extract category function interface
export interface categories { mainCategory: string, subCategory: any }

// userDataSlice props  
export interface userDataProps {
   userId: null | string;
   errorMessage: string | boolean;
   username: string | null | undefined;
}


export interface SelectedCategory {
   productsToDisplay: [] | null;
   selectedCategory: string;
}

export interface userCredentials {
   email: string | null;
   username?: string | null;
   id?: string;
}


/// login form error reducer type 
export interface loginError {
   emailError: null | boolean,
   emailErrorMsg: string | null,
   emailValue: null | string,
   passwordError: null | boolean,
   passwordErrorMsg: string | null
   passwordValue: null | string,
}


// login form types 
export interface FormElements extends HTMLFormControlsCollection {
   emailInput: HTMLInputElement;
   passwordInput: HTMLInputElement;
}

export interface LoginForm extends HTMLFormElement {
   readonly elements: FormElements;

}