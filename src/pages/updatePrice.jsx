import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopBar from '../components/topbar';
import { getCurrentUser, updateProductPrice } from '../api/FirestorAPI';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function PriceUpdatePage() {

  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if(localStorage.getItem("userEmail")) getCurrentUser(setCurrentUser);
    else navigate("/login");
  }, []);

  useEffect(() =>{
    if(Object.keys(currentUser).length !== 0){
      if (!(currentUser.userType==="supermarketStaff" || currentUser.userType==="manager")) navigate("/login");
    }
  },[currentUser])

  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleUpdatePrice = () => {
    // Implement logic to update price
    updateProductPrice(productId, price)
    // Reset form fields
    setProductId('');
    setPrice('');
  };

  return (
    <>
      <TopBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom>Update Price</Typography>
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
                label="New Price"
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
                onClick={handleUpdatePrice}
              >
                Update Price
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>
      </div>
    </>
  );
}

export default PriceUpdatePage;
