"use client";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";
import { Menu } from "@/components/Menu";

export const DesktopNavbar: React.FC<{ name: string }> = ({ name }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.menu}>
        <Button variant="text" onClick={toggleMenu} style={{ padding: 0 }}>
          <MenuIcon sx={{ color: "#1351B4" }} />
        </Button>
        <Menu toggleMenu={toggleMenu} open={isMenuOpen} />
      </div>
      <div className={styles.user_info_container}>
        <span className={styles.welcome_message}>Olá,</span>
        <span className={styles.user_name}>{name}</span>
      </div>
    </nav>
  );
};
