import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { extractCategories, selectProduct } from "../lib/helpers";
import { addItemToCart } from "../lib/cartActions";
import styles from "../sass/selectedProduct.module.scss";
import productStyles from "../sass/product.module.scss"
export default function SelectedProduct() {
  const [searchParams] = useSearchParams();
  const products = useSelector((state: any) => state.products.products)
  const category: string = searchParams.get("category") as string
  const id = searchParams.get("id") as string
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState<number>(1);
  const { mainCategory, subCategory } = extractCategories(category)
  const dispatchToStore = useDispatch()
  const userID = useSelector((state: any) => state.user.userId);
  console.log(id)
  console.log(quantity)

  console.log(product)
  useEffect(() => {
    if (products) {
      // there is a problemn with the electronics/security&surveillence category since we have a & sign 
      // the id query parameter is always electronics/security only it thinks that survillence is another query paramter
      if (subCategory) {
        console.log(products)
        const product = selectProduct(products[mainCategory!][subCategory!], id)
        console.log(products[mainCategory!][subCategory!][id])
        setProduct(product)
      }
      else {
        const product = selectProduct(products[mainCategory!], id)
        setProduct(product)
      }
    }

  }, [product, products])
  return (
    product && <section className={styles.selectedProduct}>
      <div className={styles.imageContainer}>
        <img className={styles.productImage} src={product.imageUrl} alt="not found" />
      </div>
      <div className={styles.productDetails} >
        <h1 className={styles.productTitle}>{product.imageTitle}</h1>
        <div className={styles.productOptions}>
          <h2 className={styles.price}>price : $212</h2>
          <div className={styles.quantityBlock}>
            <div className={styles.buttons}>
              <button
                className={styles.addQuantity}
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                <span>&#43;</span>
              </button>
              <button
                className={styles.reduceQuantity}
                onClick={() =>
                  quantity > 1 && setQuantity(quantity - 1)
                }
              >
                <span>&#8722;</span>
              </button>
            </div>

            {/* </div> */}

            <h2 className={styles.quantity}>Quantity : {quantity}</h2>
          </div>
          <button
            className={productStyles.addProductBtn}
            onClick={() => addItemToCart({ ...product, quantity }, userID, dispatchToStore)}
          >
            add to cart
          </button>
        </div>

      </div>



    </section >);
}
