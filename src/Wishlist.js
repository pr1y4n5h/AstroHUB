import { useCart } from "./Cart-context";
import { useWishlist } from "./Wishlist-context";

function ShowItemsInWishlist({ item }) {
  const { setItemsInCart } = useCart();

  return (
    <>
      <div
        key={item.id}
        className="product-card-home"
        style={{
          padding: "1rem",
          margin: "3rem 3rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "none",
          width: "200px",
          opacity: `${item.inStock ? 1 : 0.5}`
        }}
      >
        <div className="thumbnail" style={{ padding: "0.5rem 0.5rem" }}>
          <img
            src={item.image}
            width="180px"
            height="220px"
            alt={item.productName}
          />
          <button> Remove from Wish </button>
        </div>
        <div className="product-content">
          <div style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
            {item.name}
          </div>
          <div>Rs. {item.price}</div>
          {item.inStock && <div style={{ color: "green" }}> In Stock </div>}
          {!item.inStock && <div style={{ color: "red" }}> Out of Stock </div>}
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
            className="addToCart"
            onClick={() => setItemsInCart((items) => [...items, item])}
          >
            {" "}
            Add to Cart{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export function Wishlist() {
  const { itemsInWishlist } = useWishlist();

  return (
    <>
      <h2> Your Wishlist </h2>
      <div
        className="wishlist-parts"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="wishlist-part-1">
          {itemsInWishlist.length > 0 ? (
            <ul>
              <div
                className="ProductListing"
                style={{ display: "flex", flexWrap: "wrap", margin: "3rem" }}
              >
                {itemsInWishlist.map((items) => (
                  <>
                    <ShowItemsInWishlist item={items} />
                  </>
                ))}{" "}
              </div>
            </ul>
          ) : (
            <h1> Your Wishlist is empty... 😓 </h1>
          )}
        </div>
      </div>
    </>
  );
}
