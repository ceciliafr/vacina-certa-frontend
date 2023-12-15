"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";
import { Menu } from "@/components/mobile/Menu";
import { UserContext } from "@/contexts/userContext";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userProfile } = useContext(UserContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Button variant="text" onClick={toggleMenu} style={{ padding: 0 }}>
          <MenuIcon sx={{ color: "#1351B4" }} />
        </Button>
        <Menu toggleMenu={toggleMenu} open={isMenuOpen} />
      </div>
      <nav className={styles.nav}>
        <div className={styles.user_info_container}>
          <span className={styles.welcome_message}>Olá,</span>
          <span className={styles.user_name}>
            {userProfile?.nickname ?? "Que bom que você veio!"}
          </span>
        </div>

        <div className={styles.logo_container}>
          <Link href="/">
            <Image
              src="/logo.svg"
              fill
              style={{
                objectFit: "contain",
              }}
              alt="vacina_certa_logo"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};
