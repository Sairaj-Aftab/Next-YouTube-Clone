import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { videosData } from "./videoSlice";

export const uploadVideo = createAsyncThunk(
  "videos/upload_video",
  async ({ data }) => {
    try {
      const response = await axios.post(`/api/videos`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get All Videos
export const getAllVideos = createAsyncThunk(
  "videos/getAllVideos",
  async () => {
    try {
      const response = await axios.get(`/api/videos`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Get Single Video
export const getSingleVideo = createAsyncThunk(
  "videos/getSingleVideo",
  async (id) => {
    try {
      const response = await axios.get(`/api/videos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Get single user videos
export const getUserVideos = createAsyncThunk(
  "videos/getUserVideos",
  async (userId) => {
    try {
      const response = await axios.get(`/api/videos/uservid/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Views counting in videos
export const updateViewsCounting = createAsyncThunk(
  "videos/updateViewsCounting",
  async (videoId) => {
    try {
      const response = await axios.put(`/api/videos/${videoId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Delete single video
export const deleteVideo = createAsyncThunk(
  "videos/deleteVideo",
  async (videoId) => {
    try {
      const response = await axios.delete(`/api/videos/${videoId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Get Search Photos
export const searchVideos = createAsyncThunk(
  "videos/searchVideos",
  async (search) => {
    try {
      const response = await axios.post(`/api/videos/search`, { search });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Trending videos
export const trendVideos = createAsyncThunk(
  "videos/trendVideos",
  async (id) => {
    try {
      const response = await axios.get(`/api/videos/trend/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// like to video
export const likeToVideo = createAsyncThunk(
  "videos/likeToVideo",
  async ({ id, userId }) => {
    try {
      const response = await axios.put(`/api/videos/like/${id}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Dislike to video
export const disLikeToVideo = createAsyncThunk(
  "videos/disLikeToVideo",
  async ({ id, userId }) => {
    try {
      const response = await axios.put(`/api/videos/dislike/${id}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Comment to video
export const commentToVideo = createAsyncThunk(
  "comment/commentToVideo",
  async ({ videoId, userId, desc }) => {
    try {
      const response = await axios.post(`/api/comment/${videoId}/${userId}`, {
        desc,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Get comment to video
export const getComment = createAsyncThunk(
  "comment/getComment",
  async ({ videoId }) => {
    try {
      const response = await axios.get(`/api/comment/get/${videoId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Get Search Photos
export const searchPhotos = createAsyncThunk(
  "photos/searchPhotos",
  async ({ search }) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/photos/search`,
        { search },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete Photos
export const deletePhoto = createAsyncThunk(
  "photos/deletePhoto",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/photos/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
