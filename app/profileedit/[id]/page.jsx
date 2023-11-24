"use client";
import MainPages from "@/app/components/MainPages";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getUser, userEdit } from "@/redux/features/videos/videoApiSlice";
import { videosData } from "@/redux/features/videos/videoSlice";
import { firebaseStorage } from "@/firebase/main";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function ProfileEdit({ params }) {
  const dispatch = useDispatch();

  const { user } = useSelector(videosData);
  const { data: session } = useSession();

  const [img, setImg] = useState(null);
  const [input, setInput] = useState({
    img: user?.img,
    name: user?.name,
    email: user?.email,
  });

  const changeInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const profileImgUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    const storageRef = ref(firebaseStorage, file?.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);

        // setImgLoading(Math.ceil(progress));
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
            // setLoading(null);
            // toast.info("Cancel");
            break;

          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL);
          setInput((prev) => ({ ...prev, img: downloadURL }));
          // localStorage.setItem("File", downloadURL);
          // setImgLink(downloadURL);
          // setImgLoading(null);
        });
      }
    );
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!input.name || !input.email) {
      toast.warning("Fields are required!");
    } else {
      dispatch(userEdit({ id: params.id, data: input }));
    }
  };
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <MainPages>
      <div className="flex justify-center mt-5">
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-2">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={profileImgUpload}
              className="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
            />
            <span className="cursor-pointer bg-blue-500 py-1 px-3 rounded-md">
              Profile photo
            </span>
          </div>
          <input
            className="bg-transparent border border-cyan-500 rounded-sm p-1 text-sm md:text-base font-semibold text-white"
            type="text"
            name="name"
            value={input.name}
            onChange={changeInput}
            placeholder="Name"
          />
          <input
            className="bg-transparent border border-cyan-500 rounded-sm p-1 text-sm md:text-base font-semibold text-white"
            type="text"
            name="email"
            value={input.email}
            onChange={changeInput}
            placeholder="Email"
          />
          <button
            type="submit"
            className="bg-blue-500 py-1 rounded-md text-sm font-semibold text-white"
          >
            Edit
          </button>
        </form>
      </div>
    </MainPages>
  );
}

export default ProfileEdit;
