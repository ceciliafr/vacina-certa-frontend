import { MenuItems } from "@/components/MenuItems";
import styles from "./styles.module.css";

export const DesktopMenu: React.FC = () => {
  return (
    <div className={styles.container}>
      <MenuItems />
    </div>
  );
};
