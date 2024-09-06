import { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../Redux/hooks';
import { selectRandomProducts } from '../lib/helpers';
import { eCommerceDB, readFromDB } from '../lib/firebase';
import { ProductProps } from '../types';
import { Outlet } from 'react-router-dom';
import Product from '../components/Product';
import '../sass/homepage.scss';
export default function HomePage() {
  const [selectedItems, setSelectedItems] = useState<any>(null);
  const productsState = useAppSelector((state) => state.products.products);
  readFromDB('/products', eCommerceDB);
  useEffect(() => {
    if (productsState instanceof Object) {
      const randomProducts = selectRandomProducts(productsState);
      setSelectedItems(randomProducts);
      console.log(randomProducts);
    }
  }, [productsState]);

  return (
    <Fragment>
      <h1 className="home-heading">Featured products</h1>
      <section className="homepage">
        <Outlet />
        {selectedItems &&
          selectedItems.map((el: ProductProps, index: number) => (
            <Product
              key={index}
              imageUrl={el.imageUrl}
              imageTitle={el.imageTitle}
              category={el?.subCategory ? el.subCategory : el.category}
              price={el.price}
              index={index}
              id={el.id}
            />
          ))}
      </section>
    </Fragment>
  );
}
