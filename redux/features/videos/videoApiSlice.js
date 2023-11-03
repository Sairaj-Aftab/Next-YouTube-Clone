import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadVideo = createAsyncThunk(
  "videos/upload_video",
  async ({ data }) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/videos`,
        data
      );
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
      const response = await axios.get(`http://localhost:3000/api/videos`);
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
      const response = await axios.get(
        `http://localhost:3000/api/videos/uservid/${userId}`
      );
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
