import { Navbar } from "@/components/Navbar";
import styles from "./styles.module.css";

export const RightContent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className={styles.container}>
      <Navbar name="Cissa" />
      <div className={styles.children_content}>{children}</div>
    </div>
  );
};
