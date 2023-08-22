import { useEffect, useState } from "react";
import "../sass/homepage.scss";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import Card from "../components/Card";
import Portal from "../components/Portal";
import ProductModal from "../components/ProductModal";


export default function HomePage() {

   const [selectedItems, setSelectedItems] = useState<any>(null);
   const [productInfo, setProductInfoToggle] = useState<any>(false)
   const productsState = useSelector((state: any) => state.products.products)
  

   const selectedProducts: any = []
   const categories = ["electronics", "womenFashion", "computerPerpherials", "books", "videoGames", "dataStorage"]

   if (productsState.length) {
      for (let i = 0; i < 6; i++) {

         const currentCategory = categories[i]

         const product = productsState.find((el: any) => el.category === currentCategory);

         selectedProducts.push(product)
      }

   }

   useEffect(() => {
      setSelectedItems(selectedProducts)
      // addUserEntry("checkIn",userState)
   }, [productsState])

   return (
      <section className="homepage">
         {productInfo.toggle &&

            <Portal>
               <ProductModal
                  info={productInfo.productInfo}
                  setProductInfoToggle={setProductInfoToggle} />
            </Portal>

         }

         {selectedItems && selectedItems.map((el: any, index: any) =>
            <div key={index} className="product-item">

               <h1 className="product-category" >{el.category}</h1>
               <Card>
                  <Product
                     imageSrc={el.imageUrl}
                     imageTitle={el.imageTitle}
                     category={el.category}
                     setProductInfoToggle={setProductInfoToggle}
                     price={Math.floor(Math.random() * 100)+10}
                  />
               </Card>
            </div>
         )}

      </section>
   )
}