import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./features/videos/videoSlice";

const store = configureStore({
  reducer: {
    videos: videoSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
