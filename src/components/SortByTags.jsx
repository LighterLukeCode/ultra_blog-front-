import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagPosts } from "../redux/slices/postsSlice";
import { Post } from "./Post/index.jsx";
import axios from "../axios.js";
import { useParams } from "react-router-dom";
import { useState } from "react";

const SortByTags = () => {
  const [data, setData] = useState();
  const { tag } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    axios
      .get(`/posts/tags/${tag}`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.warn(err);
        alert("Ошибка при получении поста");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      {(isLoading ? [...Array(5)] : data).map((obj, index) => (
        <Post
          key={index}
          id={obj._id}
          title={obj.title}
          imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ""}
          user={obj.user}
          createdAt={obj.createdAt.replace("T", " ").slice(0, 16)}
          viewsCount={obj.viewCount}
          commentsCount={obj.comments.length}
          tags={obj.tags}

          // isEditable={userData?._id === obj.user._id}
        />
      ))}
    </>
  );
};

export default SortByTags;
