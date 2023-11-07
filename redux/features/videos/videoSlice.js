import { createSlice } from "@reduxjs/toolkit";
import {
  deleteVideo,
  getAllVideos,
  getUserVideos,
  searchPhotos,
  searchVideos,
  updateViewsCounting,
  uploadVideo,
} from "./videoApiSlice";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: null,
    userVideos: null,
    searchVideos: null,
    tags: [],
    loader: false,
    success: false,
    message: null,
    error: null,
  },
  reducers: {
    setVideoMessageEmpty: (state, action) => {
      state.success = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.success = true;
        state.videos = state.videos ?? [];
        state.videos.push(action.payload.video);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(getAllVideos.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.videos = action.payload.video.reverse();
        state.success = true;
        state.loader = false;
      })
      .addCase(getUserVideos.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getUserVideos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getUserVideos.fulfilled, (state, action) => {
        state.userVideos = action.payload.video;
        state.success = true;
        state.loader = false;
      })
      .addCase(updateViewsCounting.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateViewsCounting.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updateViewsCounting.fulfilled, (state, action) => {
        state.videos[
          state.videos.findIndex((data) => data._id == action.payload.video._id)
        ] = action.payload.video;
        state.success = true;
        state.loader = false;
      })
      .addCase(searchVideos.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.searchVideos = action.payload.video;
        state.message = action.payload.message;
        state.success = true;
        state.loader = false;
      })
      .addCase(searchPhotos.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(searchPhotos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.photos = action.payload.photos;
        state.success = true;
        state.loader = false;
      })
      .addCase(deleteVideo.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.userVideos = state.userVideos.filter(
          (data) => data._id !== action.payload.video._id
        );
        state.videos = state.videos.filter(
          (data) => data._id !== action.payload.video._id
        );
        state.success = true;
        state.loader = false;
        state.message = action.payload.message;
      });
  },
});

export const videosData = (state) => state.videos;

// Export Reducer Actions
export const { setVideoMessageEmpty } = videosSlice.actions;

export default videosSlice.reducer;
