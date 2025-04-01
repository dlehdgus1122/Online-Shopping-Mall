import styles from "./cart.module.css";

export const CartList = ({
  cart,
  convertPrice,
  checkLists,
  handleQuantity,
  handleRemove,
  handleCheckList,
}) => {
  const handleOrder = () => {
    const order = {
      id: Date.now(),
      user_id: 1,
      order_date: new Date().toISOString().slice(0, 10),
      order_status: "pending",
      order_total: cart.price * cart.quantity,
      order_items: [
        {
          product_id: cart.id,
          quantity: cart.quantity,
          price: cart.price,
        },
      ],
    };

    // 주문 정보를 서버에 전송
    fetch("https://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        // 주문이 성공적으로 처리된 경우
        console.log("주문이 성공적으로 처리되었습니다.");
        // TODO: 성공 처리 로직 추가

        // 주문이 완료되면 해당 상품을 장바구니에서 제거
        handleRemove(cart.id);
      })
      .catch((error) => {
        console.error("주문 처리 중 오류가 발생했습니다.");
        // TODO: 오류 처리 로직 추가
      });
  };

  return (
    <section className={styles.cart_product_list}>
      <input
        type="checkbox"
        id={cart.id}
        onChange={(e) => {
          handleCheckList(e.currentTarget.checked, `${cart.id}`);
        }}
        checked={checkLists.includes(`${cart.id}`) ? true : false}
      />
      <div className={styles.cart_product_wrap}>
        <div className={styles.cart_product_image}>
          <img src={cart.image} alt="product-img" />
        </div>

        <div className={styles.cart_product_info}>
          <p className={styles.seller_store}>{cart.provider}</p>
          <p className={styles.product_name}>{cart.name}</p>
          <p className={styles.price}>{convertPrice(cart.price)} $ </p>
          <p className={styles.delivery}>Free</p>
        </div>
      </div>

      <div className={styles.cart_product_count}>
        <img
          className={styles.minus}
          src="/images/icon-minus-line.svg"
          alt="minus"
          onClick={() => {
            handleQuantity("minus", cart.id, cart.quantity - 1);
          }}
        />

        <div className={styles.count}>
          <span>{cart.quantity}</span>
        </div>
        <img
          className={styles.plus}
          src="/images/icon-plus-line.svg"
          alt="plus"
          onClick={() => handleQuantity("plus", cart.id, cart.quantity + 1)}
        />
      </div>

      <div className={styles.cart_product_price}>
        <p className={styles.total_price}></p>
        <button className={styles.btn_submit} onClick={handleOrder}>Order</button>
      </div>

      <div
        className={styles.product_remove}
        onClick={() => handleRemove(cart.id)}
      >
        <img src="/images/icon-delete.svg" alt="delete" />
      </div>
    </section>
  );
};
