import { useState } from "react";
import { useCart } from "./Cart-context";

function ShowItemsInCart({
  id,
  qty,
  name,
  image,
  price,
  offer,
  productName,
  inStock,
  level,
  fastDelivery
}) {
  return (
    <>
      <div
        key={id}
        style={{
          display: "flex",
          border: "none",
          boxShadow: "black 5px 5px 10px",
          width: "60%",
          margin: "1rem"
        }}
      >
        <div className="thumbnail">
          <img src={image} alt={productName} />
        </div>
        <div className="product-content" style={{ padding: "1rem 1rem" }}>
          <div
            style={{ fontSize: "1.5rem", fontWeight: "bolder", margin: "1rem" }}
          >
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
          <div>{level}</div>
          {fastDelivery ? (
            <div> Fast Delivery </div>
          ) : (
            <div> 3 days minimum </div>
          )}
          <div>
            {" "}
            <button>-</button>
            {qty}
            <button>+</button>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export function Cart() {
  const { itemsInCart } = useCart();

  return (
    <>
      <h2> Your Cart </h2>
      <div className="cart-parts" style={{ display: "flex" }}>
        <div className="cart-part-1">
          {itemsInCart.length > 0 ? (
            <ul>
              <div
                className="ProductListing"
                style={{ display: "flex", flexWrap: "wrap", margin: "3rem" }}
              >
                {itemsInCart.map(
                  ({
                    id,
                    name,
                    image,
                    price,
                    productName,
                    inStock,
                    brand,
                    level,
                    fastDelivery
                  }) => (
                    <ShowItemsInCart
                      id={id}
                      name={name}
                      image={image}
                      price={price}
                      brand={brand}
                      productName={productName}
                      inStock={inStock}
                      level={level}
                      fastDelivery={fastDelivery}
                    />
                  )
                )}{" "}
              </div>
            </ul>
          ) : (
            <h1> Your Cart is empty... 😐 </h1>
          )}
        </div>

        <span
          className="cart-part-2"
          style={{
            display: "flex",
            border: "none",
            boxShadow: "black 5px 5px 10px",
            margin: "1rem",
            flexDirection: "column",
            padding: "1.5rem 1.5rem",
            height: "50vh",
            position: "fixed",
            right: "0"
          }}
        >
          {itemsInCart.map((item) => (
            <>
              <p> Rs. {item.price} </p>
            </>
          ))}
        </span>
      </div>
    </>
  );
}
