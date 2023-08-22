import "../sass/productModal.scss";
export default function ProductModal({ info, setProductInfoToggle }: any) {

   return (
      <div className="product-modal">
         <h1 className="product-description">product description</h1>
         <div style={{padding:"1rem"}}>

            <p style={{ margin: "auto" }}>{info}</p>
         </div>
         <button className="product-modal-btn" onClick={() => setProductInfoToggle({ toggle: false })}>
            hide
         </button>
      </div>
   )
}
