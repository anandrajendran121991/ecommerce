import React, { useContext } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartContext } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";
import axios from "axios";

const Cart: React.FC<{ closeDrawer: () => void }> = ({ closeDrawer }) => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Checkout handler sends cart to backend and redirects to Stripe
  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/checkout", {
        products: cart.map(({ id, name, price, quantity }) => ({
          id,
          name,
          price,
          quantity,
        })),
      });

      const { url } = response.data;
      if (url) {
        window.location.href = url; // Redirect to Stripe checkout
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        🛒 Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body2">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item: CartItem) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    onClick={() => removeFromCart(item.id)}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${item.name} x${item.quantity}`}
                  secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography sx={{ mt: 2 }} variant="subtitle1">
            Total: ${total.toFixed(2)}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
            <Button
              fullWidth
              color="secondary"
              onClick={clearCart}
              sx={{ mt: 1 }}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
