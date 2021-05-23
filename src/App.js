import React from "react";
import "./styles.css";
import { useTheme } from "./Theme-context";
import { ProductsListing } from "./Products"
import { NavBar } from "./Navbar"
import {
  Routes,
  Route
} from "react-router-dom";
import { Cart } from "./Cart"


export default function App() {
  const { setTheme } = useTheme();
  return (
    <div className="App" style={setTheme()}>
    {/* <NavBar /> */}
    
     <Routes>
       <Route path="/" element={<ProductsListing />} />
       <Route path="/products" element={<ProductsListing />} />
       <Route path="/cart" element={<Cart />} />
       <Route path="/wishlist" element={<Wishlist />} />
       <Route path="/login" element={<Login />} />
     </Routes>
    </div>
  );
}
