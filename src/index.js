import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "./Theme-context";
import { CartProvider } from "./Cart-context";
import setupMockServer from "./api/products-server";

import App from "./App";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
  rootElement
);
