import React, { useState, useMemo, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleResetPassword } from "../api/AuthAPI";
import { getCurrentUser } from "../api/FirestorAPI";

function MainFunctionButtons() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)", // Adjusted height to subtract the height of the top bar
      }}
    >
      {currentUser.userType === "salesClerk" || currentUser.userType === "manager" ? (
        <Button
          variant="contained"
          sx={{ margin: "10px 10px 20px 10px", width: "200px", height: "50px" }} // Increased bottom margin
          onClick={() => {
            navigate("/bill");
          }}
        >
          Make a Bill
        </Button>
      ) : (
        <></>
      )}
      {currentUser.userType === "supermarketStaff" || currentUser.userType === "manager" ? (
        <Button
          variant="contained"
          sx={{ margin: "10px 10px 20px 10px", width: "200px", height: "50px" }} // Increased bottom margin
          onClick={() => {
            navigate("/inventoryUpdate");
          }}
        >
          Update Inventory
        </Button>
      ) : (
        <></>
      )}
      {currentUser.userType === "supermarketStaff" || currentUser.userType === "manager" ? (
        <Button
          variant="contained"
          sx={{ margin: "10px 10px 20px 10px", width: "200px", height: "50px" }} // Increased bottom margin
          onClick={() => {
            navigate("/priceUpdate");
          }}
        >
          Update Price
        </Button>
      ) : (
        <></>
      )}
      {currentUser.userType === "supermarketStaff" || currentUser.userType === "manager" ?(
        <Button
          variant="contained"
          sx={{ margin: "10px 10px 20px 10px", width: "200px", height: "50px" }} // Increased bottom margin
          onClick={() => {
            navigate("/addProduct");
          }}
        >
          Add product
        </Button>
      ) : (
        <></>
      )}
      {currentUser.userType == "manager" ? (
        <Button
          variant="contained"
          sx={{ margin: "10px 10px 20px 10px", width: "200px", height: "50px" }} // Increased bottom margin
          onClick={() => {
            navigate("/salesTransactions");
          }}
        >
          View Sales Transactions
        </Button>
      ) : (
        <></>
      )}
      {currentUser.userType == "manager" ? (
        <Button
          variant="contained"
          sx={{ margin: "10px 10px 20px 10px", width: "200px", height: "50px" }} // Increased bottom margin
          onClick={() => {
            navigate("/addUser");
          }}
        >
          Add User
        </Button>
      ) : (
        <></>
      )}
      <Button
        variant="contained"
        sx={{ margin: "10px 10px 20px 10px", width: "200px", height: "50px" }} // Increased bottom margin
        onClick={() => {
          handleResetPassword(currentUser.userEmail);
        }}
      >
        Reset Password
      </Button>
    </Box>
  );
}

export default MainFunctionButtons;
