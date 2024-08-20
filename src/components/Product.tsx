import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../lib/cartActions";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { resolvePath } from "../lib/helpers";
import Loader from "./Loader";
import styles from "../sass/product.module.scss"
export interface ProductProps {
  imageUrl: string;
  imageTitle: string;
  price: string;
  id: string;
  category: string;
  subCategory?: string;
  index?: number;
}

export default function Product({
  imageUrl,
  imageTitle,
  price,
  category,
  id,
  index
}: ProductProps) {

  const userID = useSelector((state: any) => state.user.userId);
  const location = useLocation();
  const item = {
    imageUrl,
    imageTitle,
    price,
    category,
    id,
    quantity: 1
  };

  const url = `products/?name=${imageTitle}&category=${category}&id=${id}`
  const path = resolvePath(location.pathname, url)
  const dispatchToStore = useDispatch();
  return (
    <Fragment>
      <section className={styles.product}>
        <Link key={index} to={path}>
          {imageUrl ? (
            <div className={styles.imageContainer}>
              <img className={styles.productImage} src={imageUrl} alt="not found" />
            </div>
          ) : (
            <Loader />
          )}
        </Link>
        <section className={styles.productInfo} >
          <div>
            <p className={styles.productName}>
              {imageTitle?.length >= 66
                ? imageTitle.slice(0, 56).concat("...")
                : imageTitle}
            </p>
          </div>

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
    </Fragment >
  );
}
