"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { MdPhotoCameraBack } from "react-icons/md";
import { toast } from "react-toastify";
import MainPages from "../components/MainPages";
import Image from "next/image";
import thumbnail from "@/public/thumbnail.png";
import UploadProgressBar from "../components/UploadProgressBar";
import { firebaseStorage } from "@/firebase/main";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "@/redux/features/videos/videoApiSlice";
import {
  setVideoMessageEmpty,
  videosData,
} from "@/redux/features/videos/videoSlice";

function UploadFile() {
  const dispatch = useDispatch();
  const { loader, success, message, error } = useSelector(videosData);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign");
    },
  });

  const userId = session?.user && session.user?.doc._id;

  const [loading, setLoading] = useState(null);
  const [imgLoading, setImgLoading] = useState(null);

  const [file, setFile] = useState(undefined);
  const [fileLink, setFileLink] = useState(null);
  const [imgLink, setImgLink] = useState(null);

  const [input, setInput] = useState({
    title: "",
    desc: "",
    tags: "",
  });

  const handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeFile = (e) => {
    // setInput((prev) => ({ ...prev, video: e.target.files?.[0] }));
    setFile(e.target.files?.[0]);
    const urlLink = URL.createObjectURL(e.target.files?.[0]);
    setFileLink(urlLink);
  };

  const [task, setUploadTask] = useState(null);
  const submitVideo = async (e) => {
    e.preventDefault();
    const storageRef = ref(firebaseStorage, file?.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploadTask(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setLoading(Math.ceil(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            console.log("unauthor");
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            setLoading(null);
            toast.info("Cancel");
            console.log("storage/canceled");
            // User canceled the upload
            break;

          case "storage/unknown":
            console.log("unknown");

            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          if (downloadURL) {
            const data = {
              userId: userId,
              title: input.title,
              desc: input.desc,
              video: downloadURL,
              thumbnail: imgLink ? imgLink : null,
              tags: input.tags,
            };
            dispatch(uploadVideo({ data }));
          }
        });
      }
    );
  };

  // Upload Thumbnail
  const uploadThumbnail = (e) => {
    const file = e.target.files && e.target.files[0];
    const storageRef = ref(firebaseStorage, file?.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImgLoading(Math.ceil(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            setLoading(null);
            toast.info("Cancel");
            break;

          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // localStorage.setItem("File", downloadURL);
          setImgLink(downloadURL);
          setImgLoading(null);
        });
      }
    );
  };

  const cancelUploading = () => {
    swal({
      title: "Are you sure?",
      text: "Do you have to cancle it?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (task) {
          task.cancel();
          setFile(undefined);
          setImgLink(null);
          setUploadTask(null);
          setInput({ title: "", desc: "", tags: "" });
        }
      }
    });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }

    if (success || message) {
      // dispatch(getAllPhotos());
      setFile(undefined);
      setImgLink(null);
      setInput({ title: "", desc: "", tags: "" });
      setLoading(null);
    }

    if (success || message || error) {
      dispatch(setVideoMessageEmpty());
    }
  }, [success, message, error]);

  return (
    <MainPages>
      <form onSubmit={submitVideo} method="post" encType="multipart/form-data">
        {!file && !loading && (
          <div className="flex justify-center items-center h-[90vh]">
            <div className="flex flex-col gap-5 items-center justify-center border border-cyan-500 rounded-lg h-[70vh] w-1/2">
              <div className="text-5xl">
                <AiOutlineCloudUpload />
              </div>
              <h1 className="text-xl text-slate-300 font-bold">
                Upload Videos
              </h1>

              <button className="relative bg-cyan-500 py-2 px-8 cursor-pointer rounded-md text-lg font-semibold text-white">
                <input
                  name="video"
                  onChange={handleChangeFile}
                  type="file"
                  accept="video/*"
                  className="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
                />
                Select Files
              </button>
            </div>
          </div>
        )}
        {!loading && file && (
          <div className="flex justify-center mb-5">
            <div className="border border-cyan-500 rounded-lg w-1/2 p-3 flex flex-col gap-3">
              <input
                className="w-full bg-transparent border border-cyan-500 rounded-md p-2 text-lg text-white font-semibold"
                type="text"
                name="title"
                value={input.title}
                onChange={handleInputChange}
                placeholder="Title..."
              />
              {fileLink ? (
                <div className="relative">
                  <video
                    className="w-full"
                    src={fileLink}
                    controls={true}
                    height={300}
                    width={200}
                  ></video>
                  {/* Thumbnail Image */}
                  {imgLink && (
                    <Image
                      src={imgLink ? imgLink : thumbnail}
                      alt="Thumbnail"
                      width={500}
                      height={500}
                      className="absolute top-0 left-0 object-cover w-full h-full"
                    />
                  )}
                  <div
                    onClick={() => {
                      setFileLink(null), setImgLink(null);
                    }}
                    className="absolute top-1 right-1 text-3xl rounded-full cursor-pointer text-white bg-black bg-opacity-40"
                  >
                    <IoIosClose />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5 items-center justify-center border border-cyan-500 rounded-lg h-auto py-10 w-full">
                  <div className="text-5xl">
                    <AiOutlineCloudUpload />
                  </div>
                  <h1 className="text-xl text-slate-300 font-bold">
                    Upload Videos
                  </h1>
                  <button className="relative bg-cyan-500 py-2 px-8 cursor-pointer rounded-md text-lg font-semibold text-white">
                    <input
                      name="video"
                      onChange={handleChangeFile}
                      type="file"
                      accept="video/*"
                      className="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
                    />
                    Select Files
                  </button>
                </div>
              )}
              {/* Thumbnail */}

              {fileLink && (
                <div className="w-[150px] h-[100px] rounded-md relative">
                  <input
                    name="image"
                    onChange={uploadThumbnail}
                    type="file"
                    accept="image/*"
                    className="w-full h-full absolute top-0 left-0 bottom-0 right-0 cursor-pointer opacity-0"
                  />
                  {imgLoading ? (
                    <UploadProgressBar loading={Number(imgLoading)} />
                  ) : (
                    <Image
                      className="w-[150px] h-[100px] object-cover rounded-md border-2 border-yellow-400"
                      src={imgLink ? imgLink : thumbnail}
                      alt="Thumbnail"
                      width={150}
                      height={100}
                    />
                  )}
                  {/* {!imgLoading && (
                  )} */}
                </div>
              )}
              <textarea
                className="w-full bg-transparent border border-cyan-500 rounded-md p-2 text-lg text-white font-semibold"
                rows={5}
                name="desc"
                value={input.desc}
                onChange={handleInputChange}
                placeholder="Description..."
              ></textarea>
              <input
                className="w-full bg-transparent border border-cyan-500 rounded-md p-2 text-lg text-white font-semibold"
                type="text"
                name="tags"
                value={input.tags}
                onChange={handleInputChange}
                placeholder="Tags..."
              />
              <button
                type="submit"
                disabled={!input.title || !input.desc || !fileLink}
                className="text-lg font-bold text-white bg-blue-500 disabled:bg-[#cccccc] disabled:text-[#666666] py-1 rounded-md"
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </form>
      {/* Loading progress bar */}
      {loading && (
        <div className="h-[90vh] flex flex-col justify-center">
          <UploadProgressBar loading={Number(loading)} />
          <div className="flex gap-5 items-center justify-center mt-2">
            <span className="text-base font-semibold">{`${loading}`} %</span>{" "}
            <button
              onClick={cancelUploading}
              className="text-white text-base font-semibold bg-red-500 rounded-md py-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </MainPages>
  );
}

export default UploadFile;
