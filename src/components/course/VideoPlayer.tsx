import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
      <video
        src={videoUrl}
        controls
        className="w-full aspect-video max-h-[80vh] sm:max-h-[70vh] md:max-h-[75vh] lg:max-h-[80vh] cursor-pointer"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
