"use client";
import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="loading-container">
      <CgSpinner className="loading-spinner" size={80} />
    </div>
  );
};

export default Loading;
