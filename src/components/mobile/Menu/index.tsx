import { MenuItems } from "./MenuItems";
import Drawer from "@mui/material/Drawer";

export const Menu: React.FC<{ open: boolean; toggleMenu: () => void }> = ({
  open,
  toggleMenu,
}) => {
  return (
    <Drawer
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      open={open}
      onClose={toggleMenu}
    >
      <MenuItems />
    </Drawer>
  );
};
