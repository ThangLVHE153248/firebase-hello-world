import React, { useState } from "react";
import { ImPencil } from "react-icons/im";
import { Button, Modal } from "react-bootstrap";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const Post = ({ post }) => {
  const [show, setShow] = useState(false);
  const { title, author, id } = post;
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAuthor, setUpdatedAuthor] = useState(author);

  //   Handle
  const handleOpenEditModal = () => setShow(true);
  const handleCloseEditModal = () => setShow(false);

  // Delete post
  const handleDeletePost = async (postId) => {
    try {
      const colRefDelete = doc(db, "posts", postId);
      await deleteDoc(colRefDelete);
    } catch (error) {
      console.log(error);
    }
    setShow(false);
  };

  // Update post
  const handleUpdatePost = async (postId) => {
    try {
      const colRefUpdate = doc(db, "posts", postId);
      await updateDoc(colRefUpdate, {
        title: updatedTitle,
        author: updatedAuthor,
      });
    } catch (error) {
      console.log(error);
    }
    setShow(false);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 post-part py-2">
      <div className="rounded shadow border h-100 d-flex flex-row justify-content-between">
        <div className="p-2 flex-1">
          <div className="post-title">{title}</div>
          <div className="post-author">{author}</div>
        </div>
        <div className="d-flex flex-row">
          <div
            className="post-action post-update h-100 position-relative"
            onClick={() => handleOpenEditModal(id)}
          >
            <ImPencil className="post-action-icon position-absolute top-50 start-50"></ImPencil>
          </div>
          {/* <div
            className="post-action post-delete h-100 position-relative"
            onClick={() => handleDeletePost(id)}
          >
            <ImBin className="post-action-icon position-absolute top-50 start-50"></ImBin>
          </div> */}
        </div>
      </div>
      {/* Update Form Modal */}
      <Modal show={show} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mx-auto p-3 ">
            <form>
              <div className="mb-2">
                <div>Title</div>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={updatedTitle}
                  name="title"
                  className="w-100"
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div>Author</div>
                <input
                  type="text"
                  placeholder="Enter author"
                  value={updatedAuthor}
                  name="author"
                  className="w-100"
                  onChange={(e) => setUpdatedAuthor(e.target.value)}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdatePost(id)}>
            Update
          </Button>
          <Button variant="danger" onClick={() => handleDeletePost(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Post;
