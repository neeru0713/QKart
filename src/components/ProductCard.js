import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = (props) => {
  return (
    <Box>
    <Card className="card">
      <CardMedia
        role="img"
        component="img"
        height="194"
        image={props.product.image}
        alt="product img"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.product.name}
        </Typography>

        <Typography gutterBottom variant="h5" component="div">
          {props.product.cost}
        </Typography>

        <Rating
          name="read-only"
          value={props.product.rating}
          aria-label="stars"role="img"
        />

      

      </CardContent>

      <Button variant="contained" className = "addToCartButton">
         <AddShoppingCartOutlined/>Add To Cart
       </Button>
      

    </Card>
    </Box>
  );
};

export default ProductCard;
