import { ProductProps } from '../types';
import styles from '../sass/searchResults.module.scss';
import SearchResultItem from './SearchResultItem';
export default function SearchResults({
  results,
}: {
  results: ProductProps[];
}) {
  return (
    <section className={styles.searchResults}>
      {results ? (
        results.map((el, index) => (
          <SearchResultItem
            key={index}
            price={el.price}
            category={el.category}
            subCategory={el.subCategory}
            id={el.id}
            imageTitle={el.imageTitle}
            imageUrl={el.imageUrl}
            index={index}
          />
        ))
      ) : (
        <h1 className={styles.resultsHeading}>no results found </h1>
      )}
      <div></div>
    </section>
  );
}
