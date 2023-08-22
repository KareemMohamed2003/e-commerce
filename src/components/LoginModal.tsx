import "../sass/LoginModal.scss";

import { useDispatch, useSelector } from "react-redux";

import { getError } from "../Redux/userDataSlice";

import LoginIcon from "./svg-components/LoginIcon";
import { useEffect } from "react";

export default function LoginModal({ setModalToggle, setLoading }: any) {

   const errorMessage = useSelector((state: any) => state.user.errorMessage)


   useEffect(() => {

      if (errorMessage) {
         setLoading(false)
      }

   }, [errorMessage])

   const dispatchToStore = useDispatch();

   return (

      <section className="login-modal">
         <div className="login-icon">
            <LoginIcon />

         </div>

         <div >

            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>   {errorMessage}</p>
         </div>
         {/*  when the user closes the modal the state should be set back to initial  */}
         <button onClick={() => {

            setModalToggle(false)
            dispatchToStore(getError({ errorCode: "clear-error" }))

         }}>close</button>
      </section>

   )
}