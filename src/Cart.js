import { useCart } from "./Cart-context";
import { useCartCounter } from "./CartCount-context-test";

function ShowItemsInCart({ item }) {
  const { dispatch } = useCartCounter();

  return (
    <>
      <div
        key={item.id}
        style={{
          display: "flex",
          border: "none",
          boxShadow: "black 5px 5px 10px",
          width: "60%",
          margin: "1rem"
        }}
      >
        <div className="thumbnail">
          <img src={item.image} alt={item.productName} />
        </div>
        <div className="product-content" style={{ padding: "1rem 1rem" }}>
          <div
            style={{ fontSize: "1.5rem", fontWeight: "bolder", margin: "1rem" }}
          >
            {item.name}
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            Rs. {item.price}
          </div>
          {item.inStock && (
            <div style={{ fontWeight: "bolder", color: "green" }}>
              {" "}
              In Stock{" "}
            </div>
          )}
          <div>{item.level}</div>
          {item.fastDelivery ? (
            <div> Fast Delivery </div>
          ) : (
            <div> 3 days minimum </div>
          )}

          <div>
            <div>
              {" "}
              <button onClick={() => dispatch({ type: "DEC", payload: item })}>
                -
              </button>
              {item.qty}
              <button onClick={() => dispatch({ type: "INC", payload: item })}>
                +
              </button>{" "}
            </div>
            <button> Remove from Cart </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function Cart({ items }) {
  const { itemsInCart } = useCart();

  return (
    <>
      <h2> Your Cart </h2>
      <div
        className="cart-parts"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="cart-part-1">
          {itemsInCart.length > 0 ? (
            <ul>
              <div
                className="ProductListing"
                style={{ display: "flex", flexWrap: "wrap", margin: "3rem" }}
              >
                {itemsInCart.map((items) => (
                  <>
                    <ShowItemsInCart item={items} />
                  </>
                ))}{" "}
              </div>
            </ul>
          ) : (
            <h1> Your Cart is empty... 😐 </h1>
          )}
        </div>

        {itemsInCart.length > 0 && (
          <span
            className="cart-part-2"
            style={{
              display: "flex",
              border: "none",
              boxShadow: "black 5px 5px 10px",
              margin: "2rem 2rem",
              flexDirection: "column",
              padding: "1.5rem 1.5rem",
              height: "50vh",
              position: "sticky",
              right: "0",
              width: "250px"
            }}
          >
            {itemsInCart.map((item) => (
              <>
                <p> Rs. {item.price} </p>
              </>
            ))}
          </span>
        )}
      </div>
    </>
  );
}
