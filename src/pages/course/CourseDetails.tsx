import React from "react";
import { useNavigate } from "react-router-dom";

const CourseDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  // Hardcoded details for now (later to be fetched via API)
  const thumbnail = "https://placehold.co/1200x600";
  const title = "Introduction to Web Development";
  const description =
    "Learn the fundamentals of web development including HTML, CSS, and JavaScript to build modern, interactive websites. This course is beginner-friendly and hands-on with projects.";
  const totalDuration = "6h 45m";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Course Thumbnail */}
        <div className="w-full rounded-2xl overflow-hidden shadow-xl">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-72 md:h-[22rem] object-cover"
          />
        </div>

        {/* Right: Course Info */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {description}
          </p>

          {/* Duration Card */}
          <div className="flex items-center gap-3 bg-gray-50 border rounded-xl p-4 mb-6 shadow-sm">
            <span className="text-2xl">⏳</span>
            <div>
              <p className="text-gray-500 text-sm">Total Duration</p>
              <p className="text-xl font-semibold text-indigo-600">
                {totalDuration}
              </p>
            </div>
          </div>

          {/* Start Course Button */}
          <button
            onClick={() => navigate("/course/video")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg cursor-pointer font-semibold rounded-xl shadow-md transition-all"
          >
            Start Learning
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t my-12"></div>

      {/* Extra Section - Like Udemy (About this course) */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About this course
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          This course will walk you step-by-step through building websites from
          scratch. You’ll master the core technologies of the web, work on
          real-world projects, and build a strong foundation for your career as
          a developer.
        </p>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
