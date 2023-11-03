"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

function SessionProviders({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default SessionProviders;
