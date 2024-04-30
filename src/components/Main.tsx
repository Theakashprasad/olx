import { useEffect, useState } from "react";
import MenuBar from "./MenuBar";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../firebase/Setup";

const Main = () => {
  const [prod, setProd] = useState([]);
  const [search, setSearch] = useState("");
  // const getProduct = () => {
  //   fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((json) => setProd(json));
  // };
  // useEffect(() => {
  //   getProduct();
  // }, []);
  
  useEffect(() => {
    const firestore = getFirestore(app);

    const unsubscribe = onSnapshot(collection(firestore, "products"), (querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setProd(data);
    });

    // Detach listener
    return unsubscribe;
  }, []);

  console.log(prod);


  return (
    <div >
      <Navbar setSearch={setSearch} />
      <MenuBar />
      <Home products={prod} search={search} />
      <Footer />
    </div>
  );
};

export default Main;
