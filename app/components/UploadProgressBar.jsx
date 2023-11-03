import React from "react";

function UploadProgressBar({ loading }) {
  console.log(loading);

  return (
    <>
      <div className="flex justify-center items-center border-2 mb-2 border-cyan-500 h-16 text-white rounded-full w-16 mx-auto">
        {`${loading}`} %
      </div>
      <div className="border border-cyan-500 rounded-full h-3">
        <div
          className="progress-bar bg-cyan-500 rounded-full h-3 text-[12px] p-0 text-center"
          role="progressbar"
          aria-valuenow={Number(loading)}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${loading}%` }}
        />
      </div>
    </>
  );
}

export default UploadProgressBar;
