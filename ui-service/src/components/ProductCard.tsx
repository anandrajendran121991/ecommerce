import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { CartContext } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card
      sx={{
        maxWidth: 300,
        m: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="subtitle1">${product.price.toFixed(2)}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => addToCart(product)}
          variant="contained"
          size="small"
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
