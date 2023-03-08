import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../feature/post.slice";

const NewPost = () => {
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const data = {
    message,
    author: userId,
    // empêcher l'erreur each child should have unique key, id provisoire (timestamp)
    _id: Date.now(),
  };

  const handleForm = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/post/", data).then(() => {
      dispatch(createPost(data));
      // on envoie la data mais faut récupérer l'id maintenant car il est créé que par la bdd mongodb
      dispatch(getPosts());
    });
    // clear input
    setMessage("");
  };

  return (
    <div>
      <form className="new-post-container" onSubmit={(e) => handleForm(e)}>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Qu'as-tu à raconter aujourd'hui ?"
          value={message}
        ></textarea>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default NewPost;
