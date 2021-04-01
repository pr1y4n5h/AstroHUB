import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./styles.css";
import { useTheme } from "./Theme-context";
import { useCart } from "./Cart-context";

function NavBar() {
  const [route, setRoute] = useState("products");
  const { itemsInCart } = useCart();
  return (
    <>
      <nav>
        <ul class="navigation">
          <li class="navigation-content" onClick={() => setRoute("products")}>
            {" "}
            Products
          </li>

          <li class="navigation-content" onClick={() => setRoute("wishlist")}>
            {" "}
            Wishlist
          </li>

          <li class="navigation-content" onClick={() => setRoute("cart")}>
            {" "}
            Cart {itemsInCart.length === 0 ? "" : itemsInCart.length}
          </li>
        </ul>
      </nav>

      {route === "products" && <ProductsListing />}
      {route === "wishlist" && <Wishlist />}
      {route === "cart" && <Cart />}
    </>
  );
}

function ProductsListing() {
  const [products, setProducts] = useState([]);
  const { setItemsInCart } = useCart();

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.products);
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
        {products.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div
              key={id}
              style={{
                padding: "1rem",
                margin: "1rem 1rem",
                display: "flex",
                flexDirection: "column",
                border: "3px solid black",
                margin: "1rem",
                width: "200px",
                boxShadow: "black 5px 5px 10px"
              }}
            >
              <div className="thumbnail">
                <img
                  src={image}
                  width="180px"
                  height="220px"
                  alt={productName}
                />
                <button> Add to ❤</button>
              </div>
              <div className="product-content">
                <div style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
                  {name}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem"
                  }}
                >
                  Rs. {price}
                </div>
                {inStock && (
                  <div style={{ fontWeight: "bolder", color: "green" }}>
                    {" "}
                    In Stock{" "}
                  </div>
                )}
                {!inStock && (
                  <div style={{ fontWeight: "bolder", color: "red" }}>
                    {" "}
                    Out of Stock{" "}
                  </div>
                )}
                <div>{level}</div>
                {fastDelivery ? (
                  <div> Fast Delivery </div>
                ) : (
                  <div> 3 days minimum </div>
                )}
                <button
                  className="addToCart"
                  onClick={() =>
                    setItemsInCart((items) => [
                      ...items,
                      {
                        id,
                        name,
                        image,
                        price,
                        productName,
                        inStock,
                        level,
                        fastDelivery
                      }
                    ])
                  }
                >
                  {" "}
                  Add to Cart{" "}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

function Wishlist() {
  return <></>;
}

function Cart() {
  return <></>;
}

export default function App() {
  const { setTheme, setDark } = useTheme();
  return (
    <div className="App" style={setTheme()}>
      <div className="top-portion">
        <span
          style={{ margin: "1rem", fontSize: "3rem", fontWeight: "bolder" }}
        >
          {" "}
          Astro Hub{" "}
        </span>
        <span style={{ margin: "1rem", padding: "1rem" }}>
          {" "}
          <button onClick={() => setDark((dark) => !dark)}>
            {" "}
            Toggle{" "}
          </button>{" "}
        </span>
      </div>
      <NavBar />
    </div>
  );
}
