import styles from "./cart.module.css";

export const CartHeader = ({ isAllChecked, handleCheckAll }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Cart</h1>
      </header>
      <div className={styles.cart_title_wrap}>
        <div className={styles.tab_title}>
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={(e) => handleCheckAll(e.target.checked)}
          />
          <span>Product</span>
          <span>Quantity</span>
          <span>Price</span>

          <p>Select All</p>
        </div>
      </div>
    </>
  );
};
