import { Box } from "@mui/material";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

export function SideNav() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Accounts", path: "/" },
    { text: "Transfers", path: "/transfer" },
  ];

  function goto(path) {
    navigate(path);
  }

  return (
    <Box>
      <Drawer variant="permanent" anchor="left" open={true}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => goto(item.path)}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
