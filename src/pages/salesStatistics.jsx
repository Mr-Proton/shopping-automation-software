import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopBar from '../components/topbar';
import { getBills, getCurrentUser } from '../api/FirestorAPI';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ListContainer = styled('ul')({
  listStyleType: 'none',
  padding: 0,
});

const ListItem = styled('li')({
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '10px',
});

const SalesHistoryPage = () => {

  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if(localStorage.getItem("userEmail")) getCurrentUser(setCurrentUser);
    else navigate("/login");
  }, []);

  useEffect(() =>{
    if(Object.keys(currentUser).length !== 0){
      if (!currentUser.userType==="manager") navigate("/login");
    }
  },[currentUser])

 

  const [bills, setBills] = useState([]);
  const [productId, setProductId] = useState('');
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    if (bills.length > 0 && productId) {
      const updatedSalesHistory = [];
      bills.forEach((bill) => {
        const { bill: productList, time } = bill;
        productList.forEach((product) => {
          if (product.id === productId) {
            updatedSalesHistory.push({
              price: product.price,
              quantity: product.quantity,
              time: time
            });
          }
        });
      });
      setSalesHistory(updatedSalesHistory);
    }
  }, [bills]);

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSearchSalesHistory = () => {
    getBills((fetchedBills) => {
      // Sort bills by time in descending order
      const sortedBills = fetchedBills.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      });
      setBills(sortedBills);
    });
  };

  return (
    <>
      <TopBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: "50px",}}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom>Sales History</Typography>
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearchSalesHistory}
              >
                Search Sales History
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Sales History for Product ID: {productId}</Typography>
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                <ListContainer>
                  {salesHistory.map((sale, index) => (
                    <ListItem key={index}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <Typography variant="subtitle1">Price: {sale.price}</Typography>
                          <Typography variant="body2">Quantity: {sale.quantity}</Typography>
                        </div>
                        <Typography variant="body2">Time: {sale.time}</Typography>
                      </div>
                    </ListItem>
                  ))}
                </ListContainer>
              </div>
            </Grid>
          </Grid>
        </StyledPaper>
      </div>
    </>
  );
}

export default SalesHistoryPage;
