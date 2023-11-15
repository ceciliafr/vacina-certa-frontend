"use client";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";
import { Menu } from "@/components/Menu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <Button variant="text" onClick={toggleMenu} style={{ padding: 0 }}>
        <MenuIcon sx={{ color: "#1351B4" }} />
      </Button>

      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </nav>
  );
};
