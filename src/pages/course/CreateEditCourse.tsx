import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CourseForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Replace Redux auth.user with dummy logged-in teacherId
  const user = { id: 1, name: "Demo Teacher" };

  // Check if editing
  const editingCourse = location.state?.course || null;

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    editingCourse?.thumbnail || null
  );
  const [title, setTitle] = useState(editingCourse?.title || "");
  const [description, setDescription] = useState(
    editingCourse?.description || ""
  );
  const [duration, setDuration] = useState(editingCourse?.duration || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const teacherId = user?.id;
    const courseData = { title, description, duration, teacherId };

    try {
      if (editingCourse) {
        // ✅ Update existing course (replace with real API call)
        console.log("Updating course:", {
          id: editingCourse.id,
          data: courseData,
          imageFile: thumbnail,
        });
      } else {
        // ✅ Create new course (replace with real API call)
        console.log("Creating new course:", {
          data: courseData,
          imageFile: thumbnail,
        });
      }

      navigate("/admin/courses");
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {editingCourse ? "Edit Course" : "Create Course"}
      </h1>

      {/* Image Upload */}
      <div className="flex flex-col items-center mb-6">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
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
          {editingCourse ? "Change Picture" : "Upload Picture"}
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
        className="w-full py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 font-semibold cursor-pointer"
      >
        {editingCourse ? "Update Course" : "Create Course"}
      </button>
    </div>
  );
};

export default CourseForm;
