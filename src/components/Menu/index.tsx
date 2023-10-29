import styles from "./styles.module.css";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";

export const Menu: React.FC<{ isOpen: boolean; toggleMenu: () => void }> = ({
  isOpen,
  toggleMenu,
}) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleMenu}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <List className={styles.menu_list}>
          <Link href="/" onClick={toggleMenu}>
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
    </Drawer>
  );
};
