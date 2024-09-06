import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../lib/cartActions';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { resolvePath } from '../lib/helpers';
import { useAppSelector } from '../Redux/hooks';
import Loader from './loaders/Loader';
import styles from '../sass/product.module.scss';
import { ProductProps } from '../types';

export default function Product({
  imageUrl,
  imageTitle,
  price,
  category,
  id,
  index,
}: ProductProps) {
  const userID = useAppSelector((state) => state.user.userId) as string;
  const location = useLocation();
  const item = {
    imageUrl,
    imageTitle,
    price,
    category,
    id,
    quantity: 1,
  };

  const url = `products/?name=${imageTitle}&category=${category}&id=${id}`;
  const path = resolvePath(location.pathname, url);
  const dispatchToStore = useDispatch();
  return (
    <Fragment>
      <section className={styles.product}>
        <Link key={index} to={path}>
          {imageUrl ? (
            <div className={styles.imageContainer}>
              <img
                className={styles.productImage}
                loading="lazy"
                src={imageUrl}
                alt={imageTitle}
              />
            </div>
          ) : (
            <Loader />
          )}
        </Link>
        <section className={styles.productInfo}>
          <p className={styles.productName}>
            {imageTitle?.length >= 66
              ? imageTitle.slice(0, 56).concat('...')
              : imageTitle}
          </p>

          <div className={styles.addProduct}>
            <button
              className={styles.addProductBtn}
              onClick={() => addItemToCart(item, userID, dispatchToStore)}
            >
              add to cart
            </button>
            <h2>{price}$</h2>
          </div>
        </section>
      </section>
    </Fragment>
  );
}
