"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react";

function SignInSignUp() {
  const router = useRouter();
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signin, setSignIn] = useState({
    email: "",
    password: "",
  });

  //   Change SignUp Input Value
  const handleSignUpChange = (e) => {
    setSignUp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSignInChange = (e) => {
    setSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //   SignUp with Form
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUp.name || !signUp.email || !signUp.password) {
      toast.warning("All fields are required");
    } else {
      await axios
        .post("/api/auth/register", {
          ...signUp,
          email: signUp.email.toLowerCase(),
        })
        .then((res) =>
          res.data.message
            ? toast.error(res.data.message)
            : toast.success("Successfully created")
        )
        .catch((err) => toast.error("Please try again"));
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn("credentials", { ...signin, redirect: false })
      .then((res) => {
        if (res?.error) {
          toast.error(res.error);
        } else {
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[90vh] px-2 sm:px-0">
        <div className="sm:border bg-slate-950 border-cyan-500 rounded-lg p-2 w-full sm:w-1/2 lg:w-1/3">
          <form onSubmit={handleSignIn} className="flex flex-col gap-2">
            <input
              className="bg-transparent border border-cyan-500 rounded-sm p-1 text-sm md:text-base font-semibold text-white"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleSignInChange}
            />
            <input
              className="bg-transparent border border-cyan-500 rounded-sm p-1 text-sm md:text-base font-semibold text-white"
              type="text"
              name="password"
              placeholder="Password"
              onChange={handleSignInChange}
            />
            <button
              type="submit"
              className="bg-blue-500 py-1 rounded-md text-sm font-semibold text-white"
            >
              Log In
            </button>
          </form>
          <h2 className="w-10 mx-auto my-2 text-center font-bold bg-slate-800 text-white rounded-md text-base py-1 px-2">
            OR
          </h2>
          <div className="flex gap-7 rounded-md justify-center py-1 items-center bg-blue-500 text-sm font-semibold text-white">
            <div className="text-2xl bg-white">
              <FcGoogle />
            </div>
            <span>Sign in with Google</span>
          </div>
          <h2 className="w-10 mx-auto my-2 text-center font-bold bg-slate-800 text-white rounded-md text-base py-1 px-2">
            OR
          </h2>
          <form onSubmit={handleSignUp} className="flex flex-col gap-2">
            <input
              className="bg-transparent border border-cyan-500 rounded-sm p-1 text-sm md:text-base font-semibold text-white"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleSignUpChange}
            />
            <input
              className="bg-transparent border border-cyan-500 rounded-sm p-1 text-sm md:text-base font-semibold text-white"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleSignUpChange}
            />
            <input
              className="bg-transparent border border-cyan-500 rounded-sm p-1 text-sm md:text-base font-semibold text-white"
              type="text"
              name="password"
              placeholder="Password"
              onChange={handleSignUpChange}
            />
            <button
              type="submit"
              className="bg-blue-500 py-1 rounded-md text-sm font-semibold text-white"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignInSignUp;
