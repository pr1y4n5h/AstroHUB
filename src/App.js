import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { useTheme } from "./Theme-context";
import { useCart } from "./Cart-context";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { useWishlist } from "./Wishlist-context";

function NavBar() {
  const [route, setRoute] = useState("products");
  const { itemsInCart } = useCart();
  const { itemsInWishlist } = useWishlist();
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
            Wishlist{" "}
            {itemsInWishlist.length === 0 ? "" : itemsInWishlist.length}
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

// function Toast() {

//   return(
//     <div style={{position: "fixed", bottom: "5px", right: "50%", visibility: "hidden"}} class="normal-alert"> Added to Wishlist </div>
//   )
// }

function ProductsListing() {
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
      {/* {wishlist ? <Toast /> : null} */}
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

// function ShowItems({
//   id,
//   name,
//   image,
//   price,
//   productName,
//   inStock,
//   offer,
//   fastDelivery
// }) {
//   return (
//     <>
//       <div
//         key={id}
//         style={{
//           padding: "1rem",
//           margin: "1rem 1rem",
//           display: "flex",
//           flexDirection: "column",
//           border: "3px solid black",
//           margin: "1rem",
//           width: "200px",
//           boxShadow: "black 5px 5px 10px"
//         }}
//       >
//         <div className="thumbnail">
//           <img src={image} width="180px" height="220px" alt={productName} />
//         </div>
//         <div className="product-content">
//           <div style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>{name}</div>
//           <div
//             style={{
//               fontWeight: "bold",
//               fontSize: "1rem"
//             }}
//           >
//             Rs. {price}
//           </div>
//           {inStock && (
//             <div style={{ fontWeight: "bolder", color: "green" }}>
//               {" "}
//               In Stock{" "}
//             </div>
//           )}
//           {!inStock && (
//             <div style={{ fontWeight: "bolder", color: "red" }}>
//               {" "}
//               Out of Stock{" "}
//             </div>
//           )}
//           <div>{offer}</div>
//           {fastDelivery ? (
//             <div> Fast Delivery </div>
//           ) : (
//             <div> 3 days minimum </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// function Wishlist() {
//   const { itemsInCart } = useCart();
//   return (
//     <>
//       <h3> Your Wishlist </h3>

//       {itemsInCart.length > 0 ? (
//         <ul>
//           <div
//             className="ProductListing"
//             style={{ display: "flex", flexWrap: "wrap", margin: "3rem" }}
//           >
//             {itemsInCart.map(({id,
//                               name,
//                               image,
//                               price,
//                               productName,
//                               inStock,
//                               offer,
//                               fastDelivery
//                               }) => (
//               <ShowItems id={id}
//                 name={name}
//                 image={image}
//                 price={price}
//                 productName={productName}
//                 inStock={inStock}
//                 offer={offer}
//                 fastDelivery={fastDelivery}
//                />
//             ))}{" "}
//           </div>
//         </ul>
//       ) : (
//         <h1> Your wishlist is empty </h1>
//       )}
//     </>
//   );
// }

export default function App() {
  const { setTheme, setDark } = useTheme();
  return (
    <div className="App" style={setTheme()}>
      <div className="top-portion">
        <span
          style={{ margin: "1rem", fontSize: "3rem", fontWeight: "bolder" }}
        >
          {" "}
          AstroHUB 🚀{" "}
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
