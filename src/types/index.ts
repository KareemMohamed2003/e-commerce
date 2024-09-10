import { Dispatch, ReactNode, SetStateAction } from 'react';
import { RootState } from '../Redux/reduxStore';
import { mainCategories, ProductProps } from './products';
export * from './cart';
export * from "./products"
export interface LoginModalProps {
   setModalToggle: React.Dispatch<any>;
   setLoading: Dispatch<SetStateAction<boolean>>;
}
// search component props
export type SearchMenu = {
   compact: boolean;
   fullScreen: boolean;
   toggle: boolean;
};

export interface SearchProps {
   productsArr: ProductProps[];
   setSearchResults: Dispatch<SetStateAction<ProductProps[] | null>>;
   searchResults: ProductProps[] | null;
   searchMenu: SearchMenu;
   setSearchMenu: Dispatch<SetStateAction<SearchMenu>>;
}

export interface SearchBarProps {
   products: ProductProps[];
   setSearchResults: Dispatch<SetStateAction<ProductProps[] | null>>;
   setSearchMenu: Dispatch<SetStateAction<SearchMenu>>;
   searchResults: ProductProps[] | null;
}

// pagination component props
export interface PaginationProps {
   productParam: string;
   totalPages: number;
   currentPage: number;
   setPaginatedResults: Dispatch<SetStateAction<ProductProps[] | null>>;
   searchResults: ProductProps[] | null;
}

// notification icon props
export interface IconProps {
   icon: ReactNode;
   styling: string;
}

// sidebar props
export interface ISideBar {
   dispatch: Dispatch<any>;
   electronics: selectedCategoryType[];
   womenCategories: string[];
   menCategories: string[];
   productsState: RootState;
   setMenuToggle: Dispatch<SetStateAction<boolean>>;
}

// product props


// extract category function interface
export interface categories {
   mainCategory: mainCategories;
   subCategory: categories | null;
}

// userDataSlice props
export interface userDataProps {
   userId: null | string;
   errorMessage: string | boolean;
   username?: string | null | undefined;
   creationDate?: string;
   email?: string;
}

export interface SelectedCategory {
   productsToDisplay: ProductProps[] | null;
   selectedCategory: string;
}

export interface userCredentials {
   email: string | null;
   username?: string | null;
   id?: string;
}

export enum FormAction {
   checkEmailField = 'checkEmailField',
   checkUsernameField = 'checkUsernameField',
   checkPasswordField = 'checkPasswordField',
   reset = 'reset',
}
export interface loginAction {
   type:
   | 'checkEmailField'
   | 'checkUsernameField'
   | 'checkPasswordField'
   | 'reset';
   fieldValue?: string;
}
/// login form error reducer type
export interface loginError {
   emailError: null | boolean;
   emailErrorMsg: string | null;
   emailValue: null | string;
   passwordError: null | boolean;
   passwordErrorMsg: string | null;
   passwordValue: null | string;
}

export interface registerError extends loginError {
   usernameError: boolean;
   usernameErrorMsg: string | null;
   usernameValue: null | string;
}

// login form types
export interface FormElements extends HTMLFormControlsCollection {
   emailInput: HTMLInputElement;
   passwordInput: HTMLInputElement;
}

export interface LoginForm extends HTMLFormElement {
   readonly elements: FormElements;
}
// REGISTER FORM TYPES
export interface RegisterFormElements extends FormElements {
   usernameInput: HTMLInputElement;
}

export interface registerForm extends HTMLFormElement {
   readonly elements: RegisterFormElements;
}


export type selectedCategoryType =
   | 'cameras'
   | 'security&surveillance'
   | 'vehicle electronics'
   | 'headphones'
   | "women's clothing"
   | "women's accessories"
   | "women's handbags"
   | "women's shoes"
   | 'books'
   | 'data storage'
   | 'computer perpherials'
   | "men's shoes"
   | "men's watches"
   | "men's clothing"
   | "men's clothing"
   | "men's accessories"
   | 'video games';