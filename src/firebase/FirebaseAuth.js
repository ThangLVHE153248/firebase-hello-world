import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase-config";
import { addDoc, collection } from "firebase/firestore";

const FirebaseAuth = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState("");
  const [errorMes, setErrorMes] = useState();
  const userRef = collection(db, "users");

  //
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setUserInfo(currentUser) : setUserInfo("");
    });
  }, []);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setErrorMes("");
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(auth.currentUser, {
        displayName: "Gnaht Orp",
      });
      await addDoc(userRef, {
        email: values.email,
        password: values.password,
        id: cred.user.uid,
      });
    } catch (error) {
      setErrorMes(error);
    }
  };

  // SignOut
  const handleSignOut = () => {
    signOut(auth);
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setUserInfo(cred.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mx-auto mt-5 p-3 firebase-form border shadow rounded">
        <form onSubmit={handleCreateUser} className="mb-3">
          <div className="mb-2">
            <div>Email</div>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              className="w-100"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <div>Password</div>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="w-100"
              onChange={handleInputChange}
            />
          </div>
          {errorMes ? <div className="danger">SignUp failed</div> : ""}
          <div className="mb-3"></div>
          <button type="submit" className="btn btn-primary w-100">
            SignUp
          </button>
        </form>
        <div>
          <span>{userInfo.displayName}</span>
          <button className="btn btn-secondary" onClick={handleSignOut}>
            SignOut
          </button>
        </div>
      </div>
      <div className="mx-auto mt-5 p-3 firebase-form border shadow rounded">
        <form onSubmit={handleLogin} className="mb-3">
          <div className="mb-2">
            <div>Email</div>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              className="w-100"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <div>Password</div>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="w-100"
              onChange={handleInputChange}
            />
          </div>
          {errorMes ? <div className="danger">Login failed</div> : ""}
          <div className="mb-3"></div>
          <button type="submit" className="btn btn-warning w-100">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default FirebaseAuth;
