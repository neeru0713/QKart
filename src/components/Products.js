import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import ipConfig from "../ipConfig.json"
import Cart, {generateCartItemsFrom} from "./Cart"
import { useHistory, Link } from "react-router-dom";

const Products = (props) => {

  let history = useHistory()

  var myproducts;
  let myCartItems;

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartItemWithQty, setCartItemWithQty] = useState([])
  const [showLoader, setShowLoader] = useState(false)
  const { enqueueSnackbar } = useSnackbar();


  
  useEffect(() => {
    // Update the document title using the browser API
    setShowLoader(true)
    axios.get(`http://${ipConfig.workspaceIp}:8082/api/v1/products`)
    .then((response)=>{
      
      setShowLoader(false)
      setProducts([...response.data])
      myproducts = response.data;

    })
    .catch((err)=>{
      console.log(err)
    })

    let mytoken = localStorage.getItem('token');
    axios.get(`http://${ipConfig.workspaceIp}:8082/api/v1/cart`, {
      headers: {
        'Authorization': "Bearer "+mytoken,
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      setCartItemWithQty(response.data)
      myCartItems = generateCartItemsFrom(response.data, myproducts)
      console.log("my cart items : ", myCartItems)
      setCartItems(myCartItems)
    })
    .catch((err)=>{
      console.log("gggggggggggggggggggg : ", err)

    })

  }, []);
    // if(headershowSerachBar === "true"  ){
    //   return showSerachBar;
    // }else {
    //   null;
    // }
    function performSearch(data) {
      // Handle the data emitted by the child component
      let url=`http://${ipConfig.workspaceIp}:8082/api/v1/products/search?value=${data}`
      axios.get(url)
      .then((response)=>{
        setProducts(response.data)
      })
      .catch((err)=>{
        console.log(err)
        setProducts([])
        enqueueSnackbar("No products found" , {
          variant: "error"
        })
        
      })
    }

    function updateCartItems(){
      let mytoken = localStorage.getItem('token');
      axios.get(`http://${ipConfig.workspaceIp}:8082/api/v1/cart`, {
        headers: {
          'Authorization': "Bearer "+mytoken,
          'Content-Type': 'application/json'
        }
      })
      .then((response)=>{
        setCartItemWithQty(response.data)
        myCartItems = generateCartItemsFrom(response.data, products)
        console.log("my cart items : ", myCartItems)
        setCartItems(myCartItems)
      })
      .catch((err)=>{
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuu : ", err)

      })
    }

    function handleChildEvent(){
      console.log("child tak pahunch rha h")
      
      let mytoken = localStorage.getItem('token');
      axios.get(`http://${ipConfig.workspaceIp}:8082/api/v1/cart`, {
        headers: {
          'Authorization': "Bearer "+mytoken,
          'Content-Type': 'application/json'
        }
      })
      .then((response)=>{
        setCartItemWithQty(response.data)
        
        // console.log("my cart items when add to cart button is clicked : ", myCartItems)
        console.log("jvioenbvjrkvofevjolfenbojlefgnb : ", products)
        setCartItems(generateCartItemsFrom(response.data, products))
      })
      .catch((err)=>{
        console.log("fvfefe : ", err)
      })
      history.push("/")
    }
    

  return (
    <div>
      <Header hasHiddenAuthButtons={false} showSerachBar={true} onChildEvent={performSearch}>
      </Header>
       <Grid container className = "bg-color">
         <Grid item className="product-grid" lg={9}>
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
           <Grid container spacing={2}>
         
            {[...products].map((x, i) =>
            <Grid item md={3} lg={3} key={i}>
              <ProductCard product={x} cartItems={cartItemWithQty} onChildEvent={handleChildEvent}/>
              </Grid>
            )}
            </Grid>

         </Grid>
         <Grid item lg={3}>
            <Cart items={cartItems} handleQuantity={cartItemWithQty} updateCartItems={updateCartItems}/>
         </Grid>
       </Grid>
       { showLoader === true ? <CircularProgress /> : null}
       { showLoader === true ? <p>Loading Products</p> : null}
      <Footer />
    </div>
  );
};

export default Products;
