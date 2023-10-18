import { useLayoutEffect, useState } from "react";
const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultItTheme = isDarkTheme ? "dark" : "light";
export const useTheme = () => {
  const [theme, setTheme] = useState(defaultItTheme);
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return { theme, setTheme };
};
