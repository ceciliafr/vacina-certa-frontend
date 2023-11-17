import styles from "./styles.module.css";

export const Title: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};
