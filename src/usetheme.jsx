import { useContext } from "react";
import { ThemeContext } from "./contexs/themecontex.jsx";

export const useTheme = () => {
  return useContext(ThemeContext);
};
