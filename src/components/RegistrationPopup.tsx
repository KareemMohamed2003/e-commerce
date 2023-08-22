import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../sass/registerationPopup.scss";
import { togglePopup } from "../Redux/popupSlice";
import RegisterationIcon from "./svg-components/RegisterationIcon";
export default function Popup(props: any) {
   const dispatchToStore = useDispatch();
   const navigate = useNavigate();
   return (<div className="popup">
      <h1>your account has been created </h1>
      <div className="registerationIcon">
         <RegisterationIcon />
      </div>

      <button onClick={() => {

         navigate("/LoginPage")
         dispatchToStore(togglePopup(false));
      }}>continue</button>
   </div>)
}

