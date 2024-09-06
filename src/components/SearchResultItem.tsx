import { Link } from 'react-router-dom';
import styles from '../sass/searchResults.module.scss';
import { ProductProps } from '../types';
export default function SearchResultItem({
  imageTitle,
  imageUrl,
  index,
  price,
  id,
  category,
  subCategory,
}: ProductProps) {
  return (
    <Link
      reloadDocument
      key={index}
      to={`./products/?name=${imageTitle}&category=${subCategory ? subCategory : category}&id=${id}`}
      className={styles.productLink}
    >
      <div className={styles.result}>
        <img className={styles.image} alt={imageTitle} src={imageUrl} />
        <div>
          <h4 className={styles.productName}>
            {imageTitle.length > 40
              ? imageTitle.slice(0, 70).concat('...')
              : imageTitle}
          </h4>
          <p className={styles.price}> price : {price}$</p>
        </div>
      </div>
    </Link>
  );
}
