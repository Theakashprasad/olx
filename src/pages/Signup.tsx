import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app, auth } from "../firebase/Setup";
import olx from '../assets/olx.png'
import { Link } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const firestore = getFirestore(app); 
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        
        return addDoc(collection(firestore, "users"), {
          userId: userId, // Store the UID in the Firestore document
          userName: userName,
          userPhone: userPhone,
        });
      })

      .then((docRef) => {
        console.log("Document ID:", docRef.id);
        console.log("User signed up successfully!");
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <h1 className='font-semibold text-2xl pb-9 uppercase'>Sign UP</h1>
      <div className="flex justify-center mb-4">
        <img
          src={olx}
          alt="Logo"
          className="w-24 h-24 rounded-full"
        />
      </div>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="username" className="block mb-2 font-semibold">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-slate-300 rounded-xl"
          />
          <label htmlFor="email" className="block mt-4 mb-2 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="bg-slate-300 rounded-xl"
          />
          <label htmlFor="phone" className="block mt-4 mb-2 font-semibold">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="bg-slate-300 rounded-xl"
          />
          <label htmlFor="password" className="block mt-4 mb-2 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="bg-slate-300 rounded-xl"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded w-full">
            Signup
          </button>
        </form>
        <Link className="underline" to="/signin">Sign in</Link>
      </div>
    </div>
  );
};

export default Signup;
