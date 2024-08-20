import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import "../sass/selectedCategory.scss";
import "../sass/cart.scss";
import { useParams, useSearchParams } from "react-router-dom";
export default function SelectedCategory() {
  const selectedProducts = useSelector(
    (state: any) => state.selectedProducts.productsToDisplay,
  );
  const products = useSelector(
    (state: any) => state.products.products,
  )
  const [selectedItems, setSelectedItems] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const params = useParams()
  const category = params.category

  console.log(category)
  useEffect(() => {
    if (selectedProducts) {
      setSelectedItems(selectedProducts);
    }

  }, [selectedProducts]);
  return (
    <section className="selectedProducts">
      {selectedItems &&
        selectedItems.map((el: any, index: number) =>
        (
          <Product
            key={index}
            imageUrl={el.imageUrl}
            imageTitle={el.imageTitle}
            price={el.price}
            category={el?.subCategory ? el.subCategory : el.category}
            index={index}
            id={el.id}
          />
        )
        )
      }
    </section>
  );
}
