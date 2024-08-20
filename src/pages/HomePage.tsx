import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectRandomProducts } from "../lib/helpers";
import { Outlet } from "react-router-dom";
import Product, { ProductProps } from "../components/Product";
import { eCommerceDB, readFromDB } from "../lib/firebase";
import "../sass/homepage.scss";
export default function HomePage() {

  const [selectedItems, setSelectedItems] = useState<any>(null);
  const productsState = useSelector((state: any) => state.products.products);
  readFromDB("/products", eCommerceDB)
  useEffect(() => {
    if (productsState instanceof Object) {
      const randomProducts = selectRandomProducts(productsState)
      setSelectedItems(randomProducts)
      console.log(randomProducts)
    }

  }, [productsState]);

  return (
    <Fragment>
      <h1 className="home-heading">Featured products</h1>
      <section className="homepage">
        <Outlet />
        {selectedItems &&
          selectedItems.map((el: ProductProps, index: number) => (
            <div key={index} className="product-item">
              <Product
                imageUrl={el.imageUrl}
                imageTitle={el.imageTitle}
                category={el?.subCategory ? el.subCategory : el.category}
                price={el.price}
                index={index}
                id={el.id}
              />
            </div>
          ))}

      </section>
    </Fragment>
  );
}
