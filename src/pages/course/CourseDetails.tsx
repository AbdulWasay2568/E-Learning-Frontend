import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LecturesList from "../../components/course/LecturesList";
import { Role } from "../../interfaces/enums.interface";
import { fetchCourseById } from "../../services/courseService";

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
}

interface User {
  id: number;
  name: string;
  role: Role;
}

const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null); // ✅ replace with real auth data
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    async function fetchCourse() {
      try {
        setLoading(true);
        const data: Course = await fetchCourseById(Number(id));
        setCurrentCourse(data);

        // ✅ Mock logged-in user (replace with auth context later)
        setUser({ id: 1, name: "John Doe", role: Role.Student });
      } catch (err) {
        setCurrentCourse(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="text-gray-600 text-center mt-10">Loading course...</div>
    );
  }

  if (!currentCourse) {
    return (
      <div className="text-gray-600 text-center mt-10">No course found.</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Course Thumbnail */}
        <div className="w-full rounded-2xl overflow-hidden shadow-xl">
          <img
            src={currentCourse.thumbnail || "https://placehold.co/1200x600"}
            alt={currentCourse.title}
            className="w-full h-72 md:h-[22rem] object-cover"
          />
        </div>

        {/* Right: Course Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {currentCourse.title}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            {currentCourse.description}
          </p>

          {/* Example Duration */}
          <div className="flex items-center gap-3 bg-gray-50 border rounded-xl p-4 mb-6 shadow-sm">
            <span className="text-2xl">⏳</span>
            <div>
              <p className="text-gray-500 text-sm">Total Duration</p>
              <p className="text-xl font-semibold text-indigo-600">6h 45m</p>
            </div>
          </div>

          {/* Show Start Learning only if NOT admin */}
          {user?.role !== Role.Admin && (
            <button
              onClick={() => navigate(`/course/${currentCourse.id}/video`)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg cursor-pointer font-semibold rounded-xl shadow-md transition-all"
            >
              Start Learning
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t my-12"></div>

      <LecturesList courseId={currentCourse.id} role={user?.role} />
    </div>
  );
};

export default CourseDetailsPage;
