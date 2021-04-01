import { createContext, useContext, useState } from "react";

export const themeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setDark] = useState(false);

  function setTheme() {
    if (isDark) return { backgroundColor: "#374151", color: "white" };
    else return { backgroundColor: "white", color: "black" };
  }

  // const btntxt = "Dark Mode"
  // if(isDark)
  // {
  //   btntxt = "Light Mode"
  // }
  // else{
  //   btntxt = "Dark Mode"
  // }

  return (
    <themeContext.Provider value={{ setDark, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  return useContext(themeContext);
}
