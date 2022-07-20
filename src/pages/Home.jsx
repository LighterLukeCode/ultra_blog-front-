import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios.js";
import { fetchNewPosts, fetchPosts, fetchTags, fetchTopPosts } from "../redux/slices/postsSlice";

export const Home = () => {
  const { posts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const [activeSort, setActiveSort] = React.useState(0);
  const handleChange = (e, newValue) => {
    setActiveSort(newValue);
  };

  const dispatch = useDispatch();

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const getTopPosts = () => {
    dispatch(fetchTopPosts());
  };

  const getNewPosts = () => {
    dispatch(fetchNewPosts());
  };

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={activeSort} onChange={handleChange} aria-label="basic tabs example">
        <Tab onClick={getNewPosts} label="Новые" />
        <Tab onClick={getTopPosts} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""}
                user={obj.user}
                createdAt={obj.createdAt.replace("T", " ").slice(0, 16)}
                viewsCount={obj.viewCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={
              [].concat(...posts.items.map(obj => obj.comments))

              // [
              //   {
              //     user: {
              //       fullName: "Вася Пупкинgfdgfgf",
              //       avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
              //     },
              //     text: "Это тестовый комментарий",
              //   },
              //   {
              //     user: {
              //       fullName: "Иван Иванов",
              //       avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
              //     },
              //     text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              //   },
              // ]
            }
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
