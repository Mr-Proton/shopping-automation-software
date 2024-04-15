import React, {  useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopBar from '../components/topbar';
import { postUser, getCurrentUser } from '../api/FirestorAPI';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));


function CreateUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');  
  
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleCreateUser = async () => {
    let object = {
        userEmail: email,
        password: password,
        userType: userType,
      };
    await postUser(object);
    // Reset form fields
    await setEmail('');
    await setPassword('');
    await setUserType('');
  };

  return (
    <>
      <TopBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <StyledPaper elevation={3}>
          <Typography variant="h4" align="center" gutterBottom>Create New User</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>User Type</InputLabel>
                <Select
                  value={userType}
                  onChange={handleUserTypeChange}
                >
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="salesClerk">Sales Clerk</MenuItem>
                  <MenuItem value="supermarketStaff">Supermarket Staff</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCreateUser}
              >
                Create User
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>
      </div>
    </>
  );
}

export default CreateUserPage;
