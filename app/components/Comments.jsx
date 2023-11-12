import Image from "next/image";
import React, { useEffect, useState } from "react";
import profileImg from "@/public/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { videosData } from "@/redux/features/videos/videoSlice";
import timeAgo from "@/utils/timeAgo";
import { toast } from "react-toastify";
import {
  commentToVideo,
  getComment,
} from "@/redux/features/videos/videoApiSlice";
import { useSession } from "next-auth/react";

function Comments({ params }) {
  const dispatch = useDispatch();
  const { comments, singleVideo } = useSelector(videosData);
  const { data: session } = useSession();
  const [input, setInput] = useState();

  const handleComment = (e) => {
    e.preventDefault();
    if (!input) {
      toast.warning("Field is required");
    } else {
      dispatch(
        commentToVideo({
          videoId: params.id,
          userId: session?.user?.doc._id,
          desc: input,
        })
      );
    }
  };
  useEffect(() => {
    dispatch(getComment({ videoId: params.id }));
  }, [dispatch]);
  return (
    <div className="px-2 sm:px-0">
      <h1 className="text-2xl text-white font-extrabold">
        {comments && comments?.length} Comments
      </h1>
      {/* Post Comment Box */}
      <form onSubmit={handleComment} className="flex gap-3 mt-5">
        <Image
          src={profileImg}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a comment..."
          className="bg-transparent border-b w-full mb-3"
        />
        <button type="submit">Comment</button>
      </form>
      {/* Showing comment */}
      <div className="mt-5 flex flex-col gap-5">
        {comments &&
          comments.map((data, index) => (
            <div key={index} className="flex gap-3 items-start">
              <Image
                src={profileImg}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <h3 className="text-sm font-extrabold text-white">
                    {data?.userId.name}
                  </h3>
                  <span className="text-sm font-semibold text-[#aaa]">
                    {timeAgo(new Date(data?.createdAt))}
                  </span>
                </div>
                <p className="text-white text-sm font-bold">{data?.desc}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comments;
