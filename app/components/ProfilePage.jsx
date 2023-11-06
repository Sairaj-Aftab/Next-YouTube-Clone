"use client";
import profileImg from "@/public/profile.jpg";
import { videosData } from "@/redux/features/videos/videoSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard/VideoCard";
import DataFetching from "./DataFetching";
import CardLoading from "./LoadingComponents/CardLoading";

function ProfilePage({ params }) {
  const { data: session } = useSession();

  const { userVideos } = useSelector(videosData);
  return (
    <div>
      <DataFetching params={params} />
      <div className="flex gap-5 justify-center items-center">
        {/* Profile Image */}

        <Image
          src={profileImg}
          alt="Profile"
          height={150}
          width={150}
          className="rounded-full w-[80px] h-[80px] sm:w-[150px] sm:h-[150px]"
        />
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl font-normal">
            {session && session.user?.name}
          </h2>
          <p className="text-[#aaa] text-sm font-normal">
            {session && session.user?.email}
          </p>
          <p className="text-[#aaa] text-sm font-normal">
            {session && session.user?.doc.subscribers} subscribers .{" "}
            {userVideos && userVideos?.length} videos
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-3 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-7 mt-5">
        {userVideos ? (
          userVideos.map((data, index) => (
            <VideoCard key={index} videos={data} />
          ))
        ) : (
          <>
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
