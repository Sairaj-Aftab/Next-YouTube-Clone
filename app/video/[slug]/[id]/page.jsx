"use client";
import RightSide from "@/app/components/Watching/RightSide";
import LeftSide from "@/app/components/Watching/LeftSide";
import { useDispatch, useSelector } from "react-redux";
import { videosData } from "@/redux/features/videos/videoSlice";
import { useEffect } from "react";
import {
  addHistory,
  getSingleVideo,
  trendVideos,
} from "@/redux/features/videos/videoApiSlice";
import { useSession } from "next-auth/react";

function Video({ params }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const {
    singleVideo: video,
    trendingVideos,
    loader,
  } = useSelector(videosData);

  useEffect(() => {
    dispatch(getSingleVideo(params.id));
    dispatch(trendVideos(params.id));
    // dispatch(
    //   addHistory({ userId: session?.user?.doc._id, videoId: params.id })
    // );
  }, [dispatch]);

  return (
    <div className="mt-16 pb-20">
      <div className="md:flex gap-5">
        <div className="md:w-2/3 flex flex-col gap-3">
          {video && <LeftSide video={video} params={params} />}
        </div>
        {/* Suggested Section like Left Side */}
        <div className="px-2 sm:px-0 md:w-1/3">
          <RightSide videos={trendingVideos} />
        </div>
      </div>
    </div>
  );
}

export default Video;
