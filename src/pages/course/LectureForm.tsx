import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Lecture } from "../../interfaces/lecture.interface";
import { createLecture, updateLecture } from "../../services/lectureService";

interface LocationState {
  lecture?: Lecture;
}

const LectureForm: React.FC = () => {
  const { courseId, lectureId } = useParams<{ courseId: string; lectureId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState(state?.lecture?.title || "");
  const [description, setDescription] = useState(state?.lecture?.description || "");
  const [duration, setDuration] = useState(state?.lecture?.duration || "");
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSaveLecture = async () => {
    if (!courseId) return;
    setLoading(true);

    try {
      if (lectureId) {
        // ✅ Update existing lecture
        await updateLecture(Number(lectureId), {
          title,
          description,
          duration,
          courseId: Number(courseId),
          ...(video ? { video } : {}), // include video only if uploaded
        });
      } else {
        // ✅ Create new lecture
        if (!video) {
          alert("Please upload a video file.");
          return;
        }
        await createLecture({
          title,
          description,
          duration,
          courseId: Number(courseId),
          video,
        });
      }

      alert("Lecture saved successfully!");
      navigate(`/course/${courseId}`);
    } catch (error) {
      console.error("Failed to save lecture:", error);
      alert("Something went wrong while saving lecture.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-6 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        {lectureId ? "Edit Lecture" : "Create Lecture"}
      </h2>

      {/* Video Section */}
      <div className="mb-6">
        <div className="flex flex-col items-center mt-4 space-y-4">
          {/* ✅ Show current video if editing and no new file uploaded */}
          {!video && state?.lecture?.videoUrl && (
            <div className="w-full max-w-lg">
              <video
                src={state.lecture.videoUrl}
                controls
                className="rounded-lg border border-gray-300 w-full"
              />
            </div>
          )}

          {/* Upload button */}
          <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Upload Video
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </label>

          {/* ✅ Show uploaded video filename */}
          {video && <span className="text-sm">{video.name}</span>}
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
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter lecture description"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            rows={3}
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
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium w-full sm:w-auto disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Lecture"}
        </button>
      </div>
    </div>
  );
};

export default LectureForm;
