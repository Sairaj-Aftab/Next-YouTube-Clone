"use client";
import {
  getAllVideos,
  getUserVideos,
} from "@/redux/features/videos/videoApiSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function DataFetching({ params }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideos());

    if (params?.id) {
      dispatch(getUserVideos(params?.id));
    }
  }, [dispatch]);

  return <></>;
}

export default DataFetching;
