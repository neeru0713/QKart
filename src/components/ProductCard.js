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
import axios from "axios";
import ipConfig from "../ipConfig.json"
import { useSnackbar, SnackbarProvider } from "notistack";

const ProductCard = (props) => {

  const { enqueueSnackbar } = useSnackbar();

  function addToCart(event){
    
    let btn = event.target
    let pid = btn.getAttribute('productid')
    let arr = props.cartItems.filter((cartItem) => {return cartItem.productId === pid})
    if(arr.length){

      enqueueSnackbar("item already in cart" , {
        variant: "error"
      })

    }
    let qty = arr.length ? arr[0].qty : 0
    let mytoken = localStorage.getItem('token');
    const headers = {
      'Authorization': "Bearer "+mytoken,
      'Content-Type': 'application/json'
    }

    const body = {
      productId: pid,
      qty: qty+1
    }

    axios.post(`http://${ipConfig.workspaceIp}:8082/api/v1/cart`, body , {headers})
    .then(function (response) {
      // pass event to parent
      
      props.onChildEvent();
      console.log("add to cart button response : ", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

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
          ${props.product.cost}
        </Typography>

        <Rating
          name="stars"
          label="stars"
          value={props.product.rating}
          aria-label="stars" 
        />

      </CardContent>

      <Button variant="contained" className = "addToCartButton" productid={props.product._id} onClick={addToCart}>
         <AddShoppingCartOutlined/>Add To Cart
       </Button>
      

    </Card>
    </Box>
  );
};

export default ProductCard;
