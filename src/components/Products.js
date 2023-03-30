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


const Products = (props) => {

  const [products, setProducts] = useState([])
  const [showLoader, setShowLoader] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Update the document title using the browser API
    setShowLoader(true)
    axios.get(`http://${ipConfig.workspaceIp}:8082/api/v1/products`)
    .then((response)=>{
      setShowLoader(false)
      setProducts(response.data)
    })
    .catch((err)=>{
      console.log(err)

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
    

  return (
    <div>
      <Header hasHiddenAuthButtons={false} showSerachBar={true} onChildEvent={performSearch}>
      </Header>
       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
           <Grid container spacing={2}>
         
            {[...products].map((x, i) =>
            <Grid item md={3} lg={3}>
              <ProductCard product={x} key={x._id}/>
              </Grid>
            )}
            </Grid>

         </Grid>
       </Grid>
       { showLoader === true ? <CircularProgress /> : null}
       { showLoader === true ? <p>Loading Products</p> : null}
      <Footer />
    </div>
  );
};

export default Products;
