import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
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
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt.replace("T", " ").slice(0, 16)}
        viewsCount={data.viewCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={
          data.comments
          // isLoading
          //   ? [
          //       {
          //         user: {
          //           fullName: `${data.comments.user?.fullName}`,
          //           avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
          //         },
          //         text: "Это тестовый комментарий 555555",
          //       },
          //       {
          //         user: {
          //           fullName: "Иван Иванов",
          //           avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
          //         },
          //         text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          //       },
          //     ]
          //   : data.comments.map(obj => {
          //       ` ${obj?.user}: {
          //       fullName: ${obj.user?.fullName},
          //       avatarUrl: ${obj.user?.avatarUrl},
          //     },
          //     text: ${obj.text}`;
          //     })
        }
        isLoading={false}
      >
        <Index items={setData} />
      </CommentsBlock>
    </>
  );
};
