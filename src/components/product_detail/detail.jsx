import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../service/fetcher";

export const Detail = ({ convertPrice, cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);

  const handleQuantity = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  const setQuantity = (id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: product.id,
      image: product.image,
      name: product.title,
      quantity: quantity,
      price: product.price,
      tags: product.tags,
    };
    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
  };

  const handleCart = () => {
    const cartItem = {
      id: product.id,
      image: product.image,
      name: product.title,
      quantity: count,
      price: product.price,
      tags: product.tags,
    };
    const found = cart.find((el) => el.id === cartItem.id);
    if (found) setQuantity(cartItem.id, found.quantity + count);
    else setCart([...cart, cartItem]);
  };

  useEffect(() => {
    getProducts().then((data) => {
      setProduct(
        data.data.products.find((product) => product.id === parseInt(id))
      );
    });
  }, [id, product.price]);

  return (
    product && (
      <>
        <main className={styles.main}>
          <section className={styles.product}>
            <div className={styles.product_img}>
              <img src={product.image} alt="product" />
            </div>
          </section>
          <section className={styles.product}>
            <div className={styles.product_info}>
              <p className={styles.seller_store}>{product.tags}</p>
              <p className={styles.product_name}>{product.title}</p>
              <span className={styles.price}>
                {convertPrice(product.price + "")}
                <span className={styles.unit}> $ </span>
              </span>
            </div>

            <div className={styles.delivery}>
              <p>Free</p>
            </div>

            <div className={styles.line}></div>

            <div className={styles.amount}>
              <img
                className={styles.minus}
                src="/images/icon-minus-line.svg"
                alt="minus"
                onClick={() => handleQuantity("minus")}
              />

              <div className={styles.count}>
                <span>{count}</span>
              </div>

              <img
                className={styles.plus}
                src="/images/icon-plus-line.svg"
                alt="plus"
                onClick={() => handleQuantity("plus")}
              />
            </div>

            <div className={styles.line}></div>

            <div className={styles.sum}>
              <div>
                <span className={styles.sum_price}>Total Price</span>
              </div>

              <div className={styles.total_info}>
                <span className={styles.total}>
                  Quantity <span className={styles.total_count}>{count}</span>
                </span>
                <span className={styles.total_price}>
                  {convertPrice(product.price * count)}
                  <span className={styles.total_unit}> $ </span>
                </span>
              </div>
            </div>

            <div className={styles.btn}>
              <button className={styles.btn_buy}>Purchase</button>
              <button
                className={styles.btn_cart}
                onClick={() => {
                  handleCart();
                }}
              >
                Cart
              </button>
            </div>
          </section>
        </main>
      </>
    )
  );
};
