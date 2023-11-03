"use client";
import React from "react";
import { ToastContainer } from "react-toastify";

function Toastify() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    ></ToastContainer>
  );
}

export default Toastify;
