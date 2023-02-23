import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedScrollPosition: null,
  isPostModalOpen: false,
  lastCommentsUpdate: new Date().toString(),
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFeedScrollPosition(state, data) {
      state.feedScrollPosition = data.payload;
    },
    setModalOpen(state, data) {
      state.isPostModalOpen = data.payload;
    },
    setLastCommentsUpdate(state, data) {
      state.lastCommentsUpdate = data.payload;
    },
  },
});

export default postSlice.reducer;

export const { setFeedScrollPosition, setModalOpen, setLastCommentsUpdate } =
  postSlice.actions;
