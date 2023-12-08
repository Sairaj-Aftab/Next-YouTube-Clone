"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import profileImg from "@/public/profile.jpg";
import { BiDislike, BiLike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import viewsCountFormat from "@/utils/viewsCountFormat";
import { useDispatch, useSelector } from "react-redux";
import { dislike, like, videosData } from "@/redux/features/videos/videoSlice";
import timeAgo from "@/utils/timeAgo";
import { useSession } from "next-auth/react";
import {
  disLikeToVideo,
  likeToVideo,
} from "@/redux/features/videos/videoApiSlice";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";

function ProfileDescSection({ video }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { singleVideo } = useSelector(videosData);
  const { data: session } = useSession();
  const [des, setDes] = useState(false);

  const handleShowMore = () => {
    setDes(true);
  };

  const handleLike = () => {
    if (!session) {
      router.push("/sign");
    } else {
      dispatch(
        likeToVideo({ id: singleVideo._id, userId: session?.user?.doc._id })
      );
      dispatch(like(session?.user?.doc._id));
    }
  };
  const handleDislike = () => {
    if (!session) {
      router.push("/sign");
    } else {
      dispatch(
        disLikeToVideo({ id: singleVideo._id, userId: session?.user?.doc._id })
      );
      dispatch(dislike(session?.user?.doc._id));
    }
  };
  return (
    <>
      {/* Profile */}
      <div className="px-2 sm:px-0 sm:flex justify-between items-center">
        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href={`/${
              session?.user?.doc._id === video?.userId._id
                ? "profile"
                : "userprofile"
            }/${video?.userId._id}`}
            className="w-[50px] h-[50px] rounded-full"
          >
            <Avatar
              img={video?.userId?.img}
              alt={video?.userId?.name}
              width={50}
              height={50}
              classList="rounded-full"
            />
          </Link>
          <div>
            <Link
              href={`/${
                session?.user?.doc._id === video?.userId._id
                  ? "profile"
                  : "userprofile"
              }/${video?.userId._id}`}
              className="text-base md:text-lg font-semibold text-white"
            >
              {video?.userId?.name}
            </Link>
            <p className="text-sm font-normal text-[#aaa]">
              {viewsCountFormat(video?.userId?.subscribers.length)} subscribers
            </p>
          </div>
          <button className="py-1 md:py-2 px-2 md:px-3 text-sm font-semibold text-[var(--base-background)] bg-white rounded-full ml-2 md:ml-5">
            Subscribe
          </button>
        </div>
        <div>
          <div className="w-28 md:w-auto mt-2 md:mt-auto flex py-1 md:py-2 px-2 md:px-3 bg-[#252637] rounded-full">
            <div
              onClick={handleLike}
              className="flex gap-1 items-center border-r text-lg md:text-2xl pr-2 md:pr-5 cursor-pointer"
            >
              {singleVideo?.likes.includes(session?.user?.doc._id) ? (
                <BiSolidLike />
              ) : (
                <BiLike />
              )}
              <span className="text-sm font-semibold text-white">
                {singleVideo?.likes.length}
              </span>
            </div>
            <div
              onClick={handleDislike}
              className="flex gap-1 items-center text-lg md:text-2xl pl-2 md:pl-5 cursor-pointer"
            >
              <span className="text-sm font-semibold text-white">
                {singleVideo?.dislikes.length}
              </span>
              {singleVideo?.dislikes.includes(session?.user?.doc._id) ? (
                <BiSolidDislike />
              ) : (
                <BiDislike />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mx-2 sm:mx-0 bg-[#27272c] hover:bg-[#3e3e41] rounded-lg p-3 cursor-pointer text-white">
        <p className="text-base font-bold">
          {viewsCountFormat(singleVideo.views)} views{" "}
          {timeAgo(new Date(singleVideo.createdAt))}
        </p>
        <p className="text-base font-semibold" onClick={handleShowMore}>
          {des && singleVideo?.desc}
          {!des && singleVideo?.desc.length >= 250
            ? singleVideo?.desc.substring(0, 250)
            : singleVideo?.desc}
          {!des && singleVideo?.desc.length >= 250 && (
            <button className="text-base font-bold shadow-lg">Show more</button>
          )}
        </p>
        {des && (
          <button
            onClick={() => setDes(!des)}
            className="text-base font-bold shadow-lg block mt-10"
          >
            Show less
          </button>
        )}
      </div>
    </>
  );
}

export default ProfileDescSection;
