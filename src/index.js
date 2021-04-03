import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "./Theme-context";
import { CartProvider } from "./Cart-context";
import { WishlistProvider } from "./Wishlist-context";
import { CartCountProvider } from "./CartCount-context-test";
import setupMockServer from "./api/products-server";

import App from "./App";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <WishlistProvider>
        <CartProvider>
          <CartCountProvider>
            <App />
          </CartCountProvider>
        </CartProvider>
      </WishlistProvider>
    </ThemeProvider>
  </StrictMode>,
  rootElement
);
