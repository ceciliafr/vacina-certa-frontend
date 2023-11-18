import styles from "./styles.module.css";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};
