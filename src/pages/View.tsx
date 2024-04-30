import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../firebase/Setup";

const View = () => {
  const [blogslist, setBlogs] = useState([]);

  useEffect(() => {
    const firestore = getFirestore(app);

    const unsubscribe = onSnapshot(collection(firestore, "products"), (querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setBlogs(data);
    });

    // Detach listener
    return unsubscribe;
  }, []);

  console.log(blogslist);

  return <div>{/* Your JSX content here */}</div>;
};

export default View;
