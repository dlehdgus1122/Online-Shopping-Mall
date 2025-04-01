import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import { EventBanner } from "../eventBanner/eventBanner";
import { Product } from "../products/product";
import { getProducts } from "../../service/fetcher";

export const Main = ({ convertPrice, products, setProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

  
  const paginate = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const sortProduct = (type) => {
    if (type === "recent") {
      const newProduct = [...products];
      newProduct.sort((a, b) => a.id - b.id);
      setProducts(newProduct);
    } else if (type === "row") {
      const newProduct = [...products];
      newProduct.sort((a, b) => a.price - b.price);
      setProducts(newProduct);
    } else if (type === "high") {
      const newProduct = [...products];
      newProduct.sort((a, b) => b.price - a.price);
      setProducts(newProduct);
    }
    setCurrentPage(1); 
  };

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.data.products);
    });
  }, [setProducts]);


  const paginatedProducts = paginate(products, currentPage, itemsPerPage);

  return (
    <>
      <EventBanner />
      <div className={styles.filter}>
        <p onClick={() => sortProduct("recent")}>Recent</p>
        <p onClick={() => sortProduct("row")}>Lowest</p>
        <p onClick={() => sortProduct("high")}>Highest</p>
      </div>
      <main className={styles.flex_wrap}>
        {paginatedProducts.map((product) => (
          <Product
            key={`key-${product.id}`}
            product={product}
            convertPrice={convertPrice}
          />
        ))}
      </main>
      {}
      <div className={`${styles.pagination} pagination-container`}>
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
          <span
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? `${styles.active} pagination-text` : "pagination-text"}
            style={{ marginRight: "10px" }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </>
  );
};