import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Course {
  id: number;
  title: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  teacherId: number;
}

const CourseManagement: React.FC = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("All");

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        setError("");

        // ✅ Replace with real API call
        // const res = await fetch("/api/courses");
        // const data: Course[] = await res.json();

        const data: Course[] = [
          {
            id: 1,
            title: "React Fundamentals",
            description: "Learn React step by step.",
            thumbnail: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            teacherId: 101,
          },
          {
            id: 2,
            title: "Node.js API Development",
            description: "Build REST APIs with Node and Express.",
            thumbnail: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            teacherId: 102,
          },
        ];

        setCourses(data);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const handleDelete = (id: number) => {
    // ✅ Replace with API call
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Unique teacher IDs for filtering
  const uniqueTeachers = [
    "All",
    ...Array.from(new Set(courses.map((c) => c.teacherId.toString()))),
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTeacher =
      selectedTeacher === "All" || c.teacherId.toString() === selectedTeacher;
    return matchesSearch && matchesTeacher;
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Course Management</h2>
        <button
          onClick={() => navigate("/course/new")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition cursor-pointer"
        >
          Add Course
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        />
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/4"
        >
          {uniqueTeachers.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "All Teachers" : `Teacher ${t}`}
            </option>
          ))}
        </select>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto rounded border">
        {loading ? (
          <p className="p-4 text-gray-500">Loading courses...</p>
        ) : error ? (
          <p className="p-4 text-red-500">{error}</p>
        ) : (
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Thumbnail</th>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Teacher</th>
                <th className="p-3">Created</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {c.thumbnail ? (
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td
                    className="p-3 font-medium text-blue-600 hover:underline cursor-pointer"
                    onClick={() => navigate(`/course/detail/${c.id}`)}
                  >
                    {c.title}
                  </td>
                  <td className="p-3 max-w-xs truncate">
                    {c.description || "—"}
                  </td>
                  <td className="p-3">Teacher {c.teacherId}</td>
                  <td className="p-3">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() =>
                        navigate(`/course/edit/${c.id}`, {
                          state: { course: c },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline cursor-pointer"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
