"use client"
import '@/public/styles/header.css';
import Home from './NavBar/Home';
import Time from './NavBar/Time';
import Mode from './NavBar/Mode';
import News from './NavBar/News';
import Config from './NavBar/Config';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedTheme
      if (localStorage.getItem("theme")) {
        storedTheme = localStorage.getItem("theme");
      } else if (window.matchMedia("(prefers-color-scheme : dark)").matches) {
        storedTheme = "dark";
      } else {
        storedTheme = "light";
      }
      setTheme(storedTheme);
      document.body.setAttribute("data-theme", storedTheme);
    }
  }, []);

  // Función para alternar entre los temas claro y oscuro
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <header role="banner">
      {/* Main */}
      <nav role="navigation">
        {/* Home */}
        <Link href="/" className="home" title="Inicio">
          <Home/>
        </Link>
        {/* Time */}
        <Time/>
      </nav>
      {/* Search */}
      <div aria-hidden="true"></div>
      <nav role="navigation">
        {/* News */}
        <Link href="/pages/news/">
          <News/>
        </Link>
        {/* Mode */}
        <Mode toggleTheme={toggleTheme} theme={theme}/>
        {/* Lenguage */}
        <div>ES</div>
        {/* Config */}
        <Link href="/pages/config/">
          <Config/>
        </Link>
      </nav>
    </header>
  );
}
