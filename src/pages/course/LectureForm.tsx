import React, { useState } from "react";
import VideoPlayer from "../../components/course/VideoPlayer";

const LectureForm: React.FC = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSaveLecture = () => {
    console.log({
      thumbnail,
      video,
      title,
      duration,
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-6 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Create / Edit Lecture
      </h2>

      {/* Thumbnail Section */}
      <div className="flex flex-col items-center mb-6">
        {thumbnail ? (
          <img
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail Preview"
            className="w-40 sm:w-48 h-28 sm:h-32 object-cover rounded-lg shadow-md mb-4"
          />
        ) : (
          <div className="w-40 sm:w-48 h-28 sm:h-32 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg mb-4 text-gray-500 text-sm sm:text-base">
            No Thumbnail
          </div>
        )}
        <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Upload Thumbnail
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Video Section */}
      <div className="mb-6">
        <div className="w-full max-w-3xl mx-auto">
          <VideoPlayer />
        </div>
        <div className="flex justify-center mt-4">
          <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Upload Video
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Lecture Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter lecture title"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 10:25"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSaveLecture}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          Save Lecture
        </button>
      </div>
    </div>
  );
};

export default LectureForm;
