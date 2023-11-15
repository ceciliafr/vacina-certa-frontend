"use client";
import styles from "./styles.module.css";
import { DesktopMenu } from "@/components/desktop/Menu";

export const DesktopNavbar = () => {
  return (
    <nav className={styles.nav}>
      <DesktopMenu />
    </nav>
  );
};
