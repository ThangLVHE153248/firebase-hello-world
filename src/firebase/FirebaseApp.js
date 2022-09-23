import "bootstrap/dist/css/bootstrap.min.css";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "./firebase-config";

import Post from "./Post";
import SearchBar from "./SearchBar";

const FirebaseApp = () => {
  // colRef
  const colRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState([]);

  // Get collection when page render
  useEffect(() => {
    // 1. Get collection data (no in realtime)
    // getDocs(colRef)
    //   .then((snapshot) => {
    //     let newPosts = [];
    //     snapshot.docs.forEach((doc) => {
    //       newPosts.push({
    //         id: doc.id,
    //         ...doc.data(),
    //       });
    //     });
    //     setPosts(newPosts);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // 2. Get collection data (in realtime)
    onSnapshot(colRef, (snapshot) => {
      let newPosts = [];
      snapshot.docs.forEach((doc) => {
        newPosts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(newPosts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1. Add post (promise)
  // const handleAddPost = (e) => {
  //   e.preventDefault();
  // addDoc(colRef, {
  //   title,
  //   author,
  // })
  //     .then(() => {
  //       console.log("success");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // 2. Add post (async await)
  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      await addDoc(colRef, {
        title,
        author,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setAuthor("");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Search
  const handleSearch = () => {
    const q = query(colRef, where("author", ">=", "o"));
    onSnapshot(q, (snapshot) => {
      let newPosts = [];
      snapshot.docs.forEach((doc) => {
        newPosts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // setPosts(newPosts);
      console.log(newPosts);
    });
  };

  handleSearch();
  return (
    <div>
      {/* Add post form */}
      <div className="mx-auto mt-5 p-3 firebase-form border shadow">
        <form onSubmit={handleAddPost}>
          <div className="mb-2">
            <div>Title</div>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              name="title"
              className="w-100"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div>Author</div>
            <input
              type="text"
              placeholder="Enter author"
              value={author}
              name="author"
              className="w-100"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="mb-3"></div>
          <button type="submit" className="btn btn-primary w-100">
            Add post
          </button>
        </form>
      </div>
      <div className="container mt-3 post-list">
        {/* Search bar */}
        <SearchBar></SearchBar>
        {/* Post list */}
        <div className="row">
          {posts.map((post, index) => (
            <Post key={index} post={post}></Post>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirebaseApp;
