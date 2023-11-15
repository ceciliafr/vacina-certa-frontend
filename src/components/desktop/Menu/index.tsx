import styles from "./styles.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";

export const DesktopMenu: React.FC = () => {
  return (
    <div className={styles.container}>
      <List className={styles.menu_list}>
        <Link href="/">
          <ListItem className={styles.item}>Tela Inicial</ListItem>
        </Link>
        <Link href="/login">
          <ListItem className={styles.item}>Meu Perfil</ListItem>
        </Link>
        <Link href="/cartao-de-vacinas">
          <ListItem className={styles.item}>Cartão de Vacinas</ListItem>
        </Link>
        <Link href="/vacinas">
          <ListItem className={styles.item}>Vacinas</ListItem>
        </Link>
      </List>

      <List>
        <Link href="/login" onClick={() => alert("loggout")}>
          <ListItem className={styles.item}>Sair</ListItem>
        </Link>
      </List>
    </div>
  );
};
