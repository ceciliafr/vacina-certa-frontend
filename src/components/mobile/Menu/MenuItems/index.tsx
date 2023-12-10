import styles from "./styles.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  {
    id: 1,
    title: "Meu Cartão de Vacinas",
    route: "/",
    icon: "/book.png",
  },
  {
    id: 2,
    title: "Vacinas Pendentes",
    route: "/vacinas-pendentes",
    icon: "/notification.png",
  },
  {
    id: 3,
    title: "Todas as Vacinas",
    route: "/todas-as-vacinas",
    icon: "/vacina.png",
  },
  {
    id: 4,
    title: "Registrar Vacinação",
    route: "/registrar-vacinacao",
    icon: "/agenda.png",
  },
  {
    id: 5,
    title: "Meu Perfil",
    route: "/meu-perfil",
    icon: "/user.png",
  },
];

export const MenuItems: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const pathname = usePathname();

  const isActiveRouter = (href: string) => {
    return pathname === href;
  };

  return (
    <div className={styles.menu_continer}>
      <List className={styles.menu_list}>
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.route}
            className={isActiveRouter(item.route) ? styles.active_route : ""}
          >
            <ListItem
              className={
                isActiveRouter(item.route) ? styles.active_item : styles.item
              }
            >
              {item.title}
            </ListItem>
          </Link>
        ))}
      </List>

      <List>
        <Link href="/login" onClick={() => localStorage.clear()}>
          <ListItem className={styles.item}>Sair</ListItem>
        </Link>
      </List>
    </div>
  );
};
