import React from "react";

import styles from "./AddComment.module.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios.js";
import { useState } from "react";

export const Index = ({ items }) => {
  console.log(items);
  const isAuth = useSelector(selectIsAuth);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const onSubmit = async () => {
    try {
      const fields = {
        text: comment,
        postId: id,
      };
      const { data } = await axios.post("/comment", fields);
      items(data);

      navigate(`/posts/${id}`);
      setComment("");
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании комментария");
    }
  };

  // if (!window.localStorage.getItem("token") && !isAuth) {
  //   return <Navigate to="/" />;
  // }
  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src="https://mui.com/static/images/avatar/5.jpg" />
        <div className={styles.form}>
          <TextField
            value={comment}
            onChange={e => setComment(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
