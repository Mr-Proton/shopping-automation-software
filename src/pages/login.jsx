import React, { useEffect, useState } from "react";import { LoginAPI } from '../api/AuthAPI';
import {toast} from 'react-toastify'
//import { navigate } from '../helpers/useNavigate';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Loader from "../helpers/loader";


function LoginPage() {
  const [loading, setLoading] = useState(true);
  const [credentails, setCredentials] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        navigate("/");
      }else {
        setLoading(false);
      }
    });
  }, []);

  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    loading ? <Loader /> :
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        backgroundColor: '#f8f8f8',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
        paddingRight: '40px',
      }}>
        <h2>Login Page</h2>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:
                <input id="mail" type="email" onChange={(event) =>
                setCredentials({ ...credentails, email: event.target.value })
                } style={inputStyle} />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password:
                <input id="password" type="password" onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value })
                } style={inputStyle} />
            </label>
          </div>
          <button type="submit" style={buttonStyle} onClick={login}>Login</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
};

export default LoginPage;
