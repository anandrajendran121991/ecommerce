import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Drawer,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";

const Navbar: React.FC = () => {
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🛒 E-Commerce Store
          </Typography>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Cart closeDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default Navbar;
