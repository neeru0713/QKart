import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, {useEffect, useState} from "react";
import { useHistory, Link } from "react-router-dom";
import "./Cart.css";
import axios from "axios"
import ipConfig from "../ipConfig.json"


var myCartData;

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  myCartData = cartData
  let cartItemArray = [];
  cartData.forEach((cart) => {
    let cartItem = productsData.find(product => product._id === cart.productId);
    if(cartItem){
      cartItemArray.push(cartItem)
    }
  })
  
  return cartItemArray
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let total = 0;
  items.forEach((item)=>{
    let arr = myCartData.filter((cartItem) => {return cartItem.productId === item._id})
    let mul;
    if(arr.length){
      mul = arr[0].qty
    } else{
      mul = 0;
    }
    total = total + item.cost * mul
  })
  return total;
};


/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */
const ItemQuantity = ({
  value,
  productId,
  onQuantityChange,
  onHavingItemRemoved
}) => {

  function handleAdd(){

    let mytoken = localStorage.getItem('token');
    const headers = {
      'Authorization': "Bearer "+mytoken,
      'Content-Type': 'application/json'
    }

    const body = {
      productId: productId,
      qty: value+1
    }

    axios.post(`http://${ipConfig.workspaceIp}:8082/api/v1/cart`, body , {headers})
    .then(function (response) {
      console.log("plus button response : ", response.data);
      onQuantityChange(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  function handleDelete(event){

    let mytoken = localStorage.getItem('token');
    const headers = {
      'Authorization': "Bearer "+mytoken,
      'Content-Type': 'application/json'
    }

    const body = {
      productId: productId,
      qty: value-1
    }

    axios.post(`http://${ipConfig.workspaceIp}:8082/api/v1/cart`, body , {headers})
    .then(function (response) {
      onQuantityChange(response.data)
      if(value === 1){
        onHavingItemRemoved()
      }
      console.log("minus button response : ", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  

  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete} >
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * 
 */
const Cart = ({
  products,
  items,
  handleQuantity,
  updateCartItems
}) => {

  const [cartItems, setCartItems] = useState([])
  const [quantityArray, setQuantityArray] = useState([])
  const [totalCost, setTotalCost] = useState(getTotalCartValue(items))

  useEffect(() => {
    // This code will run whenever the props change
    setQuantityArray(handleQuantity)
    setTotalCost(getTotalCartValue(items))
  }, [handleQuantity]);

  useEffect(() => {
    // This code will run whenever the props change
    setCartItems(items)
    setTotalCost(getTotalCartValue(items)) 
  }, [items]);

  useEffect(()=>{
    setTotalCost(getTotalCartValue(items))
  }, [])

  

  function getQtyOfItem(item){
    let arr = quantityArray.filter((cartItem) => {return cartItem.productId === item._id})
    if(arr.length){
      return arr[0].qty;
    } else{
      return 0;
    }
  }

  function updateQuantity(val){
    console.log("parent tak gal pahuch ri a")
    setQuantityArray(val)
    myCartData = val
    setTotalCost(getTotalCartValue(cartItems))
  }

  function itemRemoved(){
    updateCartItems()
  }

  // const [cartItems, setCartItems] = useState([])

  if (!cartItems.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */
        
        cartItems.map((item,i) => (

          <Box display="flex" alignItems="flex-start" padding="1rem" key={i}>
              <Box className="image-container">
                  <img
                      // Add product image
                      src={item.image}
                      // Add product name as alt eext
                      alt="image"
                      width="100%"
                      height="100%"
                  />
              </Box>
              <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="6rem"
                  paddingX="1rem"
              >
                  <div>{item.name}</div>
                  <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                  >
                  <ItemQuantity
                  onQuantityChange={updateQuantity}
                  value={getQtyOfItem(item)}
                  productId={item._id}
                  onHavingItemRemoved={itemRemoved}
                  // Add required props by checking implementation
                  />
                  <Box padding="0.5rem" fontWeight="700">
                      ${item.cost}
                  </Box>
                  </Box>
              </Box>
          </Box>

        ))
        
        }
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${ totalCost }
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Link to="/checkout">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
          >
            Checkout
          </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
  
};

export default Cart;
