import { createContext, useContext, useReducer } from "react";
import { useCart } from "./Cart-context";

export const CartCountContext = createContext();

export function CartCountProvider({ children }) {
  const { itemsInCart } = useCart();

  const [state, dispatch] = useReducer(reducerFunc, { itemsInCart });

  return (
    <CartCountContext.Provider
      value={{ itemsCountInCart: state.itemsInCart, dispatch }}
    >
      {children}
    </CartCountContext.Provider>
  );
}

function reducerFunc(state, action) {
  switch (action.type) {
    case "INC":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        )
      };

    case "DEC":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
        )
      };

    case "REMOVE":
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item.id !== action.payload.id
        )
      };

    default:
      return { state };
  }
}

export function useCartCounter() {
  return useContext(CartCountContext);
}
