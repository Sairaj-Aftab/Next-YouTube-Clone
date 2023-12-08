"use client";
import profileImg from "@/public/profile.jpg";
import { LiaUserEditSolid } from "react-icons/lia";
import { videosData } from "@/redux/features/videos/videoSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "./VideoCard/VideoCard";
import CardLoading from "./LoadingComponents/CardLoading";
import {
  getNormalUser,
  getUser,
  getUserVideos,
} from "@/redux/features/videos/videoApiSlice";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";

function ProfilePage({ params }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user, userVideos } = useSelector(videosData);
  const { data: session } = useSession();

  useEffect(() => {
    if (params?.id) {
      dispatch(getUserVideos(params?.id));
    }

    if (pathname === `/profile/${params?.id}`) {
      dispatch(getUser());
    }
    if (pathname === `/userprofile/${params?.id}`) {
      dispatch(getNormalUser(params?.id));
    }
  }, [dispatch]);
  return (
    <div>
      <div className="flex gap-5 justify-center items-center">
        {/* Profile Image */}

        <Avatar
          img={user?.img}
          alt={user?.name}
          height={150}
          width={150}
          classList="rounded-full w-[80px] h-[80px] sm:w-[150px] sm:h-[150px]"
        />
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl font-normal flex gap-3 items-center">
            {user ? user.name : session?.user?.name}
            <Link
              href={`/profileedit/${session && session.user?.doc?._id}`}
              className={`${
                session?.user?.doc._id === params.id ? "visible" : "invisible"
              }`}
            >
              <LiaUserEditSolid style={{ cursor: "pointer" }} />
            </Link>
          </h2>
          <p className="text-[#aaa] text-sm font-normal">
            {user ? user.email : session?.user?.email}
          </p>
          <p className="text-[#aaa] text-sm font-normal">
            {user ? user.subscribers : session?.user?.doc.subscribers}{" "}
            subscribers . {userVideos && userVideos?.length} videos
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
