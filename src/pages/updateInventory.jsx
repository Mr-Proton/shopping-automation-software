import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopBar from '../components/topbar';
import { getCurrentUser, updateProductQuantity } from '../api/FirestorAPI';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function InventoryUpdatePage() {

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
  const [quantity, setQuantity] = useState('');

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdateInventory = () => {
    // Implement logic to update inventory
    updateProductQuantity(productId,quantity)
    // Reset form fields
    setProductId('');
    setQuantity('');
  };

  return (
    <>
      <TopBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom>Update Inventory</Typography>
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
                label="New Quantity"
                variant="outlined"
                type="number"
                fullWidth
                value={quantity}
                onChange={handleQuantityChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpdateInventory}
              >
                Update Inventory
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>
      </div>
    </>
  );
}

export default InventoryUpdatePage;
