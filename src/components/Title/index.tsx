import styles from "./styles.module.css";

export const Title: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};
