import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const DarkModeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(prefersDarkMode ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <motion.button
      onClick={handleThemeSwitch}
      className="px-2 text-lg transition-all duration-300 ease-in-out bg-transparent border-none bg-none"
      whileHover={{ scale: 1.1 }}
      animate={{ scale: 1, rotate: theme === "dark" ? 180 : 0 }}
      initial={{ scale: 1, rotate: theme === "dark" ? 180 : 0 }}
    >
      {theme === "dark" ? (
        <FaSun className="text-white" />
      ) : (
        <FaMoon />
      )}
    </motion.button>
  );
};

export default DarkModeToggle;
