import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";

import Product from "../components/Product";
import "../sass/selectedCategory.scss";
import "../sass/cart.scss";
export default function SelectedCategory() {

   const selectedProducts = useSelector((state: any) => state.selectedProducts.productsToDisplay)
   const [selectedItems, setSelectedItems] = useState<any>(null);

   useEffect(() => {
      if (selectedProducts) setSelectedItems(selectedProducts)
      else { return; }
   }, [selectedProducts])


   return (

      <section className="selectedProducts">
         {selectedItems && selectedItems.map((el: any, index: number) => (
            <Card key={Math.random()}>
               <Product 
                  quantity={el.quantity}
                  imageSrc={el.imageUrl}
                  imageTitle={el.imageTitle}
                  price={Math.floor(Math.random() * 100)+10}
                  category={el.category}
                  >
               </Product>
            </Card>
         ))
         }

      </section>
   )
}