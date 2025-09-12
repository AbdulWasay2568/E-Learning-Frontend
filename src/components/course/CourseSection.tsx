import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import { fetchCourses } from "../../services/courseService"; 

interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  thumbnail?: string;
  teacher?: { name: string };
  rating?: number;
  enrolledUsersCount?: number;
}

export default function CourseSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchCourses(); // ✅ real API call
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "" ||
        course.category?.toLowerCase() === selectedCategory.toLowerCase()) &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">Explore Courses</h2>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex gap-3 flex-wrap">
          {["web", "app", "cloud"].map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? "" : category
                )
              }
              className={`px-4 py-2 rounded-xl border ${
                selectedCategory === category
                  ? "bg-violet-600 text-white"
                  : "bg-white text-gray-700 hover:bg-violet-100"
              } transition`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 rounded-xl w-full border bg-white shadow-sm focus:ring-2 focus:ring-violet-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCourses.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No courses found.
            </p>
          ) : (
            filteredCourses.map((course) => (
              <Link key={course.id} to={`/course/detail/${course.id}`}>
                <CourseCard
                  image={course.thumbnail || "/placeholder.jpg"}
                  title={course.title}
                  description={course.description}
                  instructor={course.teacher?.name || "Unknown"}
                  rating={course.rating || 0}
                  users={course.enrolledUsersCount?.toString() || "0"}
                />
              </Link>
            ))
          )}
        </div>
      )}
    </section>
  );
}
