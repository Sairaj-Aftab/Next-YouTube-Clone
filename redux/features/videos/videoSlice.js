import { createSlice } from "@reduxjs/toolkit";
import {
  commentToVideo,
  deleteVideo,
  disLikeToVideo,
  getAllVideos,
  getComment,
  getSingleVideo,
  getUserVideos,
  likeToVideo,
  searchPhotos,
  searchVideos,
  trendVideos,
  updateViewsCounting,
  uploadVideo,
} from "./videoApiSlice";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: null,
    userVideos: null,
    singleVideo: null,
    searchVideos: null,
    trendingVideos: null,
    videosByTag: null,
    comments: null,
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
    like: (state, action) => {
      if (!state.singleVideo.likes.includes(action.payload)) {
        state.singleVideo.likes.push(action.payload);
        state.singleVideo.dislikes.splice(
          state.singleVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.singleVideo.dislikes.includes(action.payload)) {
        state.singleVideo.dislikes.push(action.payload);
        state.singleVideo.likes.splice(
          state.singleVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    searchByTag: (state, action) => {
      if (action.payload) {
        state.videosByTag = state.videos?.filter((item) =>
          item.tags.some((tag) => new RegExp(action.payload, "i").test(tag))
        );
      } else {
        state.videosByTag = null;
      }
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
      .addCase(getSingleVideo.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getSingleVideo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getSingleVideo.fulfilled, (state, action) => {
        state.singleVideo = action.payload.video;
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
      .addCase(trendVideos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(trendVideos.fulfilled, (state, action) => {
        state.trendingVideos = action.payload.video;
        state.success = true;
        state.loader = false;
      })
      .addCase(likeToVideo.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(likeToVideo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(likeToVideo.fulfilled, (state, action) => {
        state.success = true;
        state.loader = false;
      })
      .addCase(disLikeToVideo.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(disLikeToVideo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(disLikeToVideo.fulfilled, (state, action) => {
        state.success = true;
        state.loader = false;
      })
      .addCase(commentToVideo.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(commentToVideo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(commentToVideo.fulfilled, (state, action) => {
        state.comments.push(action.payload.comment);
        state.success = true;
        state.loader = false;
      })
      .addCase(getComment.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getComment.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.comments = action.payload.comment;
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
      });
  },
});

export const videosData = (state) => state.videos;

// Export Reducer Actions
export const { setVideoMessageEmpty, like, dislike, searchByTag } =
  videosSlice.actions;

export default videosSlice.reducer;
