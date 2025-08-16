import React from "react";
import lecture from "../../assets/videos/introToWebDev.mp4";

const VideoPlayer: React.FC = () => {
  return (
    <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
      <video
        src={lecture}
        controls
        className="w-full aspect-video max-h-[80vh] sm:max-h-[70vh] md:max-h-[75vh] lg:max-h-[80vh]"
      />
    </div>
  );
};

export default VideoPlayer;
