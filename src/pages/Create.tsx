import React, { Fragment, useContext, useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase/Setup";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import  { AuthContext } from "../store/Conrext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePercent, setImagePercent] = useState(0);
  const firestore = getFirestore(app);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(()=>{
  if(user == null){
    navigate('/signin')
  }

},[])
  const handleSubmit = () => {
    
    if (image) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(firestore, "products"), {
              name,
              category,
              price,
              userId: user,
              createdAt: new Date().toDateString(),
              imageURL: downloadURL,
            })
              .then(() => {
                console.log("Product added successfully!");
                navigate('/')

              })
              .catch((error) => {
                console.error("Error adding product:", error);
              });
          });
        }
      );
    } else {
      console.log("No image file selected.");
    }
  };

  return (
    <Fragment>
      <h1 className="font-extrabold text-3xl uppercase">Create product</h1>
      <div className="mt-20">
        <div className="mx-auto w-full max-w-lg">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            id="name"
            name="name"
            placeholder="Add name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="category" className="block mt-4 font-medium text-gray-700">
            Category
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="price" className="block mt-4 font-medium text-gray-700">
            Price
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="mt-4">
            <img src={image ? URL.createObjectURL(image) : ''} alt="Preview" className="w-48 h-48" />
            <input
              type="file"
              accept="image/*"
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
             <p className="text-sm self-center">
          {false ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
          </div>
          <button
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Upload and Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
