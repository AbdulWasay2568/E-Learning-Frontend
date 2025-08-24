import React from "react";
import logo from "../assets/Images/John.jpg";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Loader: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <img
        src={logo}
        alt="Loading..."
        className="w-96 h-96 animate-pulse"
      />
    </div>
  );
};

export default Loader;
