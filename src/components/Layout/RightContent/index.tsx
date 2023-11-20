import { DesktopNavbar } from "@/components/desktop/Navbar";
import styles from "./styles.module.css";

export const RightContent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className={styles.container}>
      <DesktopNavbar name={"Cecília Fernandes de Oliveira"} />
      <div className={styles.children_content}>{children}</div>
    </div>
  );
};
