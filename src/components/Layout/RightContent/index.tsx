import styles from "./styles.module.css";

export const RightContent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className={styles.right_content}>{children}</div>;
};
