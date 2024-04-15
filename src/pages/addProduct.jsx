import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopBar from '../components/topbar';
import { createProduct, getCurrentUser } from '../api/FirestorAPI';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const AddProductPage = () => {
  
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if(localStorage.getItem("userEmail")) getCurrentUser(setCurrentUser);
    else navigate("/login");
  }, []);

  useEffect(() =>{
    if(Object.keys(currentUser).length !== 0){
      if (!(currentUser.userType==="supermarketStaff" || currentUser.userType==="manager")) navigate("/login");;
    }
  },[currentUser])

  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleAddProduct = async () => {
    // Handle adding product logic here
    let object={
        productId: productId,
        productName: productName,
        quantity: quantity,
        price: price
    }
    await createProduct(object)
    // Reset form fields
    setProductId('');
    setProductName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <>
      <TopBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom>Add Product</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                label="Product ID"
                variant="outlined"
                fullWidth
                value={productId}
                onChange={handleProductIdChange}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={productName}
                onChange={handleProductNameChange}
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
            <Grid item xs={12}>
              <StyledTextField
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                value={price}
                onChange={handlePriceChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>
      </div>
    </>
  );
};

export default AddProductPage;
