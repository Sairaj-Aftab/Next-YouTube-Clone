"use client";
import React from "react";
import { ToastContainer } from "react-toastify";

function Toastify() {
  return (
    <ToastContainer
      style={{ zIndex: "999999999999" }}
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
