import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToCartIcon from "./svg-components/AddToCartIcon";
import InfoIcon from "./svg-components/InfoIcon";
import Loader from "./Loader";
import Portal from "./Portal";
import ProductModal from "./ProductModal";
import "../sass/product.scss";
import { addItemToCart } from "../Functions";


export default function Product({imageSrc , imageTitle,  price,category }:any) {
   const [image, setImage] = useState(null);
   const userID = useSelector((state: any) => state.user.userId)
   const [productInfo, setProductInfoToggle] = useState<any>(false)
   const dispatchToStore = useDispatch();

   useEffect(() => {

      setTimeout(() => {
         setImage(imageSrc)
      }, 1000);

      // console.log("product component re rendered")

   }, [image])

   return (

      <Fragment>
           {
            productInfo.toggle &&
            <Portal>
               <ProductModal
                  info={productInfo.productInfo}
                  setProductInfoToggle={setProductInfoToggle}
               />
            </Portal>
         }
         <section className="product" >
            <section style={{height:"75%",width:"100%",borderRadius:"10px"}}>
            <div className="image-container" >

               {imageSrc ? <img className="product-image" src={imageSrc} alt="not found" /> : <Loader />}
            </div>
            <div style={{ flexShrink: "1" }}>

               <p style={{
                  margin: "auto",
                  fontWeight: "1000",
                  color: "black"
               }}>
                  {/* {itemName.length<=188?itemName.slice(1,160).concat("..."):itemName} */}
                  {imageTitle?.length >= 50 ? imageTitle.slice(0, 40).concat("...") : imageTitle}
               </p>
            </div>

            <h2 style={{ fontSize: "2.1rem", marginTop: "1rem" }}>{price}$</h2>

            </section>
            <div className="product-icons">
               <div className="icon-container" onClick={() => {
                  const item = { imageSrc , imageTitle,  price , quantity: 1,category }
                  addItemToCart(item, userID, dispatchToStore)
               }}>

                  <AddToCartIcon />
               </div>

      
               <div className="info-icon-container"
               onClick={()=>{setProductInfoToggle({toggle:true,productInfo:imageTitle})}}
               >
                  <InfoIcon />
                 
               </div>
            </div>
         </section>

      </Fragment>
   )

}
