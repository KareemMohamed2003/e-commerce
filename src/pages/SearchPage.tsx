import { useSearchParams } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useAppSelector } from '../Redux/hooks';
import {
  pagesNum,
  searchProduct,
  toArray,
  paginateProducts,
} from '../lib/helpers';
import Product from '../components/Product';
import styles from '../sass/searchPage.module.scss';
import Loader from '../components/loaders/Loader';
import Pagination from '../components/Pagination';
import { ProductProps } from '../types';
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const products = useAppSelector((state) => state.products.products);

  const productParam: string = searchParams.get('product') as string;
  const page: number = Number(searchParams.get('page'));
  const [searchResults, setSearchResults] = useState<[] | null>([]);
  const [paginatedResults, setPaginatedResults] = useState<[] | null>([]);

  useEffect(() => {
    if (products) {
      setSearchResults(searchProduct(productParam, toArray(products)));
    }
  }, [products, productParam]);
  useEffect(() => {
    if (products && searchResults) {
      setPaginatedResults(
        paginateProducts(searchResults!, page ? page : 1) as []
      );
    } else if (!searchResults) setPaginatedResults(null);
  }, [products, searchResults]);

  return (
    <main>
      <h1 className={styles.searchHeading}>
        {`search results for "${productParam}"`}
      </h1>
      <Suspense fallback={<Loader />}>
        {paginatedResults ? (
          <section className={styles.searchPage}>
            {paginatedResults.map((el: ProductProps, index: number) => (
              <Product
                key={index}
                price={el.price}
                category={el?.subCategory ? el.subCategory : el.category}
                id={el.id}
                imageTitle={el.imageTitle}
                imageUrl={el.imageUrl}
                index={index}
              />
            ))}
          </section>
        ) : (
          <h1 className={styles.searchHeading}>no results found</h1>
        )}
      </Suspense>
      {paginatedResults!?.length > 0 && (
        <Pagination
          searchResults={searchResults}
          setPaginatedResults={setPaginatedResults}
          currentPage={page > 0 ? page : 1}
          productParam={productParam}
          totalPages={pagesNum(searchResults!?.length)}
        />
      )}
    </main>
  );
}
