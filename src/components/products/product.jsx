import { Link } from "react-router-dom";
import styles from "./product.module.css";

export const Product = ({ product, convertPrice }) => {
  const { id, title, tags, price, image } = product;

  return (
    product && (
      <div className={styles.product}>
        <Link to={`/product/${id}`}>
          <div className={styles.product_image}>
            <img src={image} alt="product" />
          </div>
        </Link>
        <div className={styles.store}>
          <span>{tags}</span>
        </div>

        <div className={styles.product_name}>
          <span>{title}</span>
        </div>

        <div className={styles.product_price}>
          <span className={styles.price}>{convertPrice(price)}</span>
          <span className={styles.unit}> $ </span>
        </div>
      </div>
    )
  );
};
