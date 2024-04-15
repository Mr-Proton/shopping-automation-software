import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import TopBar from "../components/topbar";
import { toast } from "react-toastify";
import {
  addBill,
  getCurrentUser,
  getProductWithId,
  updateBillProductQuantity,
} from "../api/FirestorAPI";
import { getCurrentTime } from "../helpers/useMoment";
import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function BillCreationPage() {

  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if(localStorage.getItem("userEmail")) getCurrentUser(setCurrentUser);
    else navigate("/login");
  }, []);

  useEffect(() =>{
    if(Object.keys(currentUser).length !== 0){
      if (!(currentUser.userType==="salesClerk" || currentUser.userType==="manager")) navigate("/login");
    }
  },[currentUser])

 

  const [currProduct, setCurrProduct] = useState({});
  useEffect(() => {
    // This useEffect hook will run whenever currProduct changes
    if (productId) handleAddToBill();
  }, [currProduct]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalBill, setTotalBill] = useState(0);

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const getNewProduct = async () => {
    await getProductWithId(productId, setCurrProduct);
  };

  const handleAddToBill = async () => {
    if (parseInt(quantity) > parseInt(currProduct.quantity)) {
      toast.error("Not enough quantity in inventory");
      return;
    } else {
      const totalPrice = parseInt(quantity) * parseInt(currProduct.price);
      const productDetails = {
        id: productId,
        name: currProduct.productName, // Fetch from database
        price: currProduct.price, // Fetch from database
        totalPrice: totalPrice,
        quantity: quantity,
        inventoryQuantity: currProduct.quantity,
      };
      const updatedProducts = [...products, productDetails];
      setProducts(updatedProducts);
      setTotalBill(totalBill + totalPrice);
    }
  };

  const calculateTotalPrice = (product) => {
    return product.quantity * product.price;
  };

  const calculateTotalBill = () => {
    return products.reduce((total, product) => {
      return total + calculateTotalPrice(product);
    }, 0);
  };

  const handlePrintBill = () => {
    // Implement printing functionality
    products.forEach((item, index) => {
      let rem = parseInt(item.inventoryQuantity) - parseInt(item.quantity);
      updateBillProductQuantity(item.id, rem)
    });
    let time = getCurrentTime("LLL");
    const bill = {
      bill: products,
      time: time,
    };
    addBill(bill);
    setProductId('');
    setProducts([]);
    setQuantity('');
    setTotalBill(0);
  };

  return (
    <>
      <TopBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "50px",
        }}
      >
        <StyledPaper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Create Bill
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                label="ID"
                variant="outlined"
                fullWidth
                value={productId}
                onChange={handleProductIdChange}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                label="Quantity"
                variant="outlined"
                type="number"
                fullWidth
                value={quantity}
                onChange={handleQuantityChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={getNewProduct}
              >
                Add to Bill
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handlePrintBill}
              >
                Print Bill
              </Button>
            </Grid>
          </Grid>
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Current Bill
            </Typography>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {/* Adjust maxHeight according to your top bar height */}
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {products.length !== 0 ? (
                  products.map((product, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <Typography variant="subtitle1">
                            Name: {product.name}
                          </Typography>
                          <Typography variant="body2">
                            ID: {product.id}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body2">
                            Quantity: {product.quantity}
                          </Typography>
                          <Typography variant="body2">
                            Unit Price: {product.price}
                          </Typography>
                          <Typography variant="body2">
                            Total Price: {product.totalPrice}
                          </Typography>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No items in the bill</li>
                )}
              </ul>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">
              Preview Total Bill: {calculateTotalBill()}
            </Typography>
          </div>
        </StyledPaper>
      </div>
    </>
  );
}

export default BillCreationPage;
