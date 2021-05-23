import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { useCart } from "./Cart-context";
import { useWishlist } from "./Wishlist-context";

export function ProductsListing() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const { setItemsInCart } = useCart();
    const { setItemsInWishlist } = useWishlist();
  
    useEffect(() => {
      (async function () {
        try {
          const {
            data: { products }
          } = await axios.get("/api/products");
          setProducts(products);
        } catch (e) {
          console.log(e);
        }
      })();
    }, []);
  
    return (
      <>

        <div
          className="ProductListing"
          style={{ display: "flex", flexWrap: "wrap", margin: "3rem" }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="product-card-home"
              style={{
                opacity: `${item.inStock ? 1 : 0.7}`
              }}
            >
              <div className="thumbnail" style={{ padding: "0.5rem 0.5rem" }}>
                <img
                  src={item.image}
                  width="180px"
                  height="220px"
                  alt={item.productName}
                />
                <button
                  className="primary-btn"
                  key={item.id}
                  onClick={() => setItemsInWishlist((items) => [...items, item])}
                >
                  {" "}
                  {cart ? "Go to ❤" : "Move to ❤"}
                </button>
              </div>
              <div className="product-content">
                <div style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
                  {item.name}
                </div>
                <div>Rs. {item.price}</div>
                {item.inStock && <div style={{ color: "green" }}> In Stock </div>}
                {!item.inStock && (
                  <div style={{ color: "red" }}> Out of Stock </div>
                )}
                <div style={{ fontWeight: "bolder", color: "green" }}>
                  {item.offer}
                </div>
                {item.fastDelivery ? (
                  <div> Fast Delivery </div>
                ) : (
                  <div> 3 days minimum </div>
                )}
                <button
                  disabled={item.inStock ? false : true}
                  className="primary-btn"
                  onClick={() => setItemsInCart((items) => [...items, item])}
                >
                  {" "}
                  Add to Cart{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }