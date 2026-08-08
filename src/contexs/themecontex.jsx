import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isdark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isdarkmode")) ?? false
  );

  return (
    <ThemeContext.Provider value={[isdark, setIsDark]}>
      {children}
    </ThemeContext.Provider>
  );
}
