import { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../Redux/hooks';
import Product from '../components/Product';
import styles from '../sass/selectedCategory.module.scss';
import Loader from '../components/loaders/Loader';
import '../sass/cart.scss';
import { ProductProps } from '../types';
export default function SelectedCategory() {
  const selectedProducts = useAppSelector(
    (state) => state.selectedProducts.productsToDisplay
  );
  const selectedCategory = useAppSelector(
    (state) => state.selectedProducts.selectedCategory
  );

  const products = useAppSelector((state) => state.products.products);
  const [selectedItems, setSelectedItems] = useState<ProductProps[] | null>(
    null
  );
  const [category, setCategory] = useState<string>();
  console.log('selected product', selectedProducts);
  useEffect(() => {
    if (products) {
      setSelectedItems(selectedProducts);
      setCategory(selectedCategory);
    }
  }, [selectedProducts, products]);
  return (
    <Fragment>
      <h1 className={styles.category}>{category && category}</h1>
      <section className={styles.selectedProducts}>
        {selectedItems ? (
          selectedItems.map((el, index: number) => (
            <Product
              key={index}
              imageUrl={el.imageUrl}
              imageTitle={el.imageTitle}
              price={el.price}
              category={el?.subCategory ? el.subCategory : el.category}
              index={index}
              id={el.id}
            />
          ))
        ) : (
          <Loader />
        )}
      </section>
    </Fragment>
  );
}
