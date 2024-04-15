import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from "../firebaseConfig";
import {toast} from 'react-toastify'



export const LoginAPI = (email, password) => {
    try {
      let response = signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (err) {
      return err;
    }
  };

  export const RegisterAPI = (email, password) => {
    try {
      let response = createUserWithEmailAndPassword(auth, email, password);
      return response;
    } catch (err) {
      return err;
    }
  };

export const handleResetPassword = (email) => {
    //const email = prompt('Enter your email:');
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success('Password reset email sent. Check your inbox.');
        })
        .catch((error) => {
          toast.error('Error sending password reset email. Please try again later.');
        });
    }
  };

  export const onLogout = () => {
    try {
      signOut(auth);
    } catch (err) {
      return err;
    }
  };


  