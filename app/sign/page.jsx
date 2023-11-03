import React from "react";
import MainPages from "../components/MainPages";
import SignInSignUp from "../components/SignInSignUp";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Sign() {
  // const { data } = useSession({
  //   required: true,
  // });
  // if (data) {
  //   redirect("/");
  // }
  return (
    <MainPages>
      <SignInSignUp />
    </MainPages>
  );
}

export default Sign;
