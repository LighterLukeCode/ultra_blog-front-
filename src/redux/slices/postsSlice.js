import axios from "../../axios.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async id => {
  await axios.delete(`/posts/${id}`);
});

export const fetchTopPosts = createAsyncThunk("posts/fetchTopPosts", async () => {
  const { data } = await axios.get("/posts/top");
  return data;
});

export const fetchNewPosts = createAsyncThunk("posts/fetchNewPosts", async () => {
  const { data } = await axios.get("/posts/date");
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: state => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: state => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchTags.pending]: state => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: state => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    },

    [fetchTopPosts.pending]: state => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchTopPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchTopPosts.rejected]: state => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    [fetchNewPosts.pending]: state => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchNewPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchNewPosts.rejected]: state => {
      state.posts.items = [];
      state.posts.status = "error";
    },
  },
});

export const postsReducer = postsSlice.reducer;
