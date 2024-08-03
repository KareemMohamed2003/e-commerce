import { LoaderFunctionArgs } from "react-router-dom";

import { redirect } from "react-router-dom";
import { store } from "./Redux/reduxStore";


export function loader({ request, params }: LoaderFunctionArgs) {
   console.log(store.getState())
   const state = {}
   return state
}
