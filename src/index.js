import { StrictMode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { ThemeProvider } from "./Theme-context";
import { CartProvider } from "./Cart-context";
import { WishlistProvider } from "./Wishlist-context";
import reportWebVitals from './reportWebVitals';
// import { CartCountProvider } from "./CartCount-context-test";
import setupMockServer from "./api/products-server";

import App from "./App";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
  <Router>
    <ThemeProvider>
      <WishlistProvider>
        <CartProvider>
          {/* <CartCountProvider> */}
            <App />
          {/* </CartCountProvider> */}
        </CartProvider>
      </WishlistProvider>
    </ThemeProvider>
    </Router>
  </StrictMode>,
  rootElement
);

reportWebVitals();