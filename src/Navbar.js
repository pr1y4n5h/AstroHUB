import React from "react";
import "./styles.css";
import { Link, Route, Routes } from "react-router-dom";
import {useTheme} from "./Theme-context"

function NavBar() {
    const { setDark } = useTheme();
    const { itemsInCart } = useCart();
    const { itemsInWishlist } = useWishlist();
    return (
       <div className="top-portion">
               {/* <span
          style={{ margin: "1rem", fontSize: "3rem", fontWeight: "bolder" }}
        >
          AstroHUB 🚀
        </span>
        <span style={{ margin: "1rem", padding: "1rem" }}>
          <button onClick={() => setDark((dark) => !dark)}>
            Toggle
          </button>
        </span> */}

        <nav>
          <ul class="navigation">
            <li class="navigation-content">
            <Link to="/"> Home </Link>
            </li>

            <li class="navigation-content">
            <Link to="/products"> Products </Link>
            </li>

            <li class="navigation-content">
            <Link to="/wishlist"> Wishlist {itemsInWishlist.length === 0 ? "" : itemsInWishlist.length} </Link>
            </li>

            <li class="navigation-content">
            <Link to="/cart"> Cart {itemsInCart.length === 0 ? "" : itemsInCart.length} </Link>
            </li>
  
            <li class="navigation-content">
            <Link to="/login"> Login </Link>
            </li>

            </ul>
          </nav>
          </div>
    );
  }