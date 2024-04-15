import React, { useEffect, useState, useMemo } from "react";
import TopBar from './topbar';
import MainFunctionButtons from './buttons';
import { onAuthStateChanged } from "firebase/auth";  
import { auth } from "../firebaseConfig";
import Loader from "../helpers/loader";
import {useNavigate} from "react-router-dom";

function Layout() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/login");
      } 
      else {
        setLoading(false);
      }
    });
  }, []);
  return (
    loading ? <Loader/> :
    <div>
      <TopBar />
      {/* Other content */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
        <MainFunctionButtons />
      </div>
    </div>
  );
}

export default Layout;
