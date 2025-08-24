import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseForm: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    // Normally, save course via API
    const courseData = { image, title, description, duration, sections };
    console.log("Course Saved:", courseData);

    // Redirect to lectures page
    navigate("/lectures");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Create / Edit Course
      </h1>

      {/* Image Upload */}
      <div className="flex flex-col items-center mb-6">
        {image ? (
          <img
            src={image}
            alt="Course"
            className="w-48 h-48 object-cover rounded-xl border mb-4"
          />
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-gray-100 border rounded-xl mb-4 text-gray-400">
            No Image
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="upload"
        />
        <label
          htmlFor="upload"
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Upload Picture
        </label>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Course Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Enter course title"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Course Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          rows={3}
          placeholder="Enter course description"
        />
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Duration</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="e.g. 10 weeks, 30 hours"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 font-semibold"
      >
        Create / Edit Course
      </button>
    </div>
  );
};

export default CourseForm;
