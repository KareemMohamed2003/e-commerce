import { createPortal } from "react-dom";
import "../sass/overlay.scss";
export default function Portal({children}:any){
   const Overlay =({children}:any)=>(
      <div className="overlay">
         {children}
      </div>

   )

   
   const portalElement=  document.getElementById("portal") as HTMLElement
   

return(

createPortal(
<Overlay>
   {children}
</Overlay>,portalElement)

)
}