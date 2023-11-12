"use client";
import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useRef } from "react";
import profileImg from "@/public/profile.jpg";
import Link from "next/link";
import timeAgo from "@/utils/timeAgo";
import viewsCountFormat from "@/utils/viewsCountFormat";
import { useDispatch } from "react-redux";
import {
  deleteVideo,
  updateViewsCounting,
} from "@/redux/features/videos/videoApiSlice";
import { useSession } from "next-auth/react";
import swal from "sweetalert";
function VideoCard({ videos }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const videoRef = useRef(null);

  const mouseHoverPlay = (e) => {
    e.preventDefault();
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const mouseLeave = (e) => {
    e.preventDefault();
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleUpdateViews = () => {
    dispatch(updateViewsCounting(videos?._id));
  };
  // Delete video
  const handleDeleteVideo = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteVideo(videos?._id));
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  return (
    <div
      className="cursor-pointer flex flex-col gap-3 relative group"
      onMouseEnter={mouseHoverPlay}
      onMouseLeave={mouseLeave}
    >
      {session?.user?.doc._id == videos?.userId && (
        <div
          onClick={handleDeleteVideo}
          className="absolute z-50 top-2 right-2 bg-slate-200 rounded-full p-1"
        >
          <MdDelete color="#000000" size={25} />
        </div>
      )}
      <Link
        href={`/video/${videos?.slug}/${videos?._id}`}
        onClick={handleUpdateViews}
        className="relative w-full h-52 sm:rounded-md"
      >
        {videos.thumbnail && (
          <Image
            src={videos.thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            alt="Thumbnail"
            className="absolute top-0 left-0 w-full h-full z-10 object-cover sm:rounded-md group-hover:hidden"
          />
        )}
        <video
          ref={videoRef}
          src={videos.video}
          className="w-full h-full absolute top-0 left-0 sm:rounded-md"
        ></video>
        {/* {video ? (
          <video ref={ref} src={videos.video} className="w-full h-52"></video>
        ) : (
          <Image
            src={videos.thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            alt="Thumbnail"
            className="w-full h-52 object-cover sm:rounded-md"
          />
        )} */}
      </Link>

      <div className="flex gap-2 px-2 sm:px-0">
        <Link href="/profile/65645">
          <Image
            src={profileImg}
            alt="Profile"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/video/${videos?.slug}/${videos?._id}`}
            onClick={handleUpdateViews}
            className="text-lg font-normal text-white line-clamp-2 leading-5 md:leading-6"
          >
            {videos.title}
          </Link>
          <Link
            href="/profile/fjke564"
            className="text-[#aaa] text-sm font-normal mt-1"
          >
            {videos?.userId?.name}
          </Link>
          <Link
            href={`/video/${videos?.slug}/${videos?._id}`}
            onClick={handleUpdateViews}
            className="text-[#aaa] text-sm font-normal"
          >
            {viewsCountFormat(videos.views)} views .{" "}
            {timeAgo(new Date(videos.createdAt))}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
