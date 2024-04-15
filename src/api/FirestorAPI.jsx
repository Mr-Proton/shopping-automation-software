import { firestore } from "../firebaseConfig";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { RegisterAPI } from "./AuthAPI";

let userRef = collection(firestore, "user");
let productRef = collection(firestore, "product");
let idRef = collection(firestore, "id");
let billRef = collection(firestore, "bill");

export const postUser = async (object) => {
  try {
    let res = await RegisterAPI(object.userEmail, object.password);

    addDoc(userRef, object)
      .then(() => {
        toast.success("User has been added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    toast.error("Cannot Create your Account");
  }
};

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data() };
        })
        .filter((item) => {
          return item.userEmail === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const createProduct = async (object) => {
  let count=0;
  onSnapshot(idRef, (response) => {
    console.log(object.productId)
    if(
      response.docs
        .map((docs) => {
          return { ...docs.data() };
        })
        .filter((item) => {
          return item.productId === object.productId;
        })[0] === undefined
    ){ 
      try {
          addDoc(productRef, object)
          .then(() => {
            addDoc(idRef, {productId: object.productId})
            .then(()=>{
              toast.success("Product has been added successfully");
            })
          })
          .catch((err) => {
              console.log(err);
          });
      } catch (err) {
          console.log(err);
          toast.error("Cannot add product");
      }
      count=1
    } else{
      if(count===0){
      toast.error("Id already exists");
      }
    }
  });
};

export const updateProductQuantity = async (productId, quantity) => {
  const q = query(
    collection(firestore, "product"),
    where("productId", "==", productId)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    querySnapshot.forEach(async (doc) => {
      const productRef = doc.ref;
      // Update the product document with the new data
      await updateDoc(productRef, { quantity: quantity });
      toast.success("Quantity has been added updated");
    });
  } else {
    toast.error("Quantity has not been added updated");
  }
};

export const updateBillProductQuantity = async (productId, quantity) => {
  const q = query(
    collection(firestore, "product"),
    where("productId", "==", productId)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    querySnapshot.forEach(async (doc) => {
      const productRef = doc.ref;
      // Update the product document with the new data
      await updateDoc(productRef, { quantity: quantity });
    });
  }
};

export const updateProductPrice = async (productId, price) => {
  const q = query(
    collection(firestore, "product"),
    where("productId", "==", productId)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    querySnapshot.forEach(async (doc) => {
      const productRef = doc.ref;
      // Update the product document with the new data
      await updateDoc(productRef, { price: price });
      toast.success("Price has been added updated");
    });
  } else {
    toast.error("Price has not been added updated");
  }
};

export const getProductWithId = async (productId, setProduct) => {
  await onSnapshot(productRef, (response) => {
    setProduct(
      response.docs
        .map((docs) => {
          return { ...docs.data() };
        })
        .filter((item) => {
          return item.productId === productId;
        })[0]
    );
  });
};

export const addBill = async (bill) => {
  try {
    addDoc(billRef, bill)
    .then(() => {
      toast.success("Bill has been added successfully");
    })
    .catch((err) => {
        console.log(err);
    });
  } catch (err) {
    console.log(err);
    toast.error("Cannot add Bill");
  }
};




export const getBills = async (setBills) => {
  await onSnapshot(billRef, (response) => {
    setBills(
      response.docs
        .map((docs) => {
          return { ...docs.data() };
        })
    );  
})
};