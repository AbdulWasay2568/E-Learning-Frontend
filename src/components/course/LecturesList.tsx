import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Lecture } from "../../interfaces/lecture.interface";
import { Role } from "../../interfaces/enums.interface";
import {
  fetchLecturesByCourse,
  deleteLecture,
} from "../../services/lectureService"; // ✅ real API calls

interface LecturesListProps {
  courseId: number;
  role?: Role;
}

const LecturesList: React.FC<LecturesListProps> = ({ courseId, role }) => {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!courseId) return;

    async function loadLectures() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchLecturesByCourse(courseId); // ✅ real API
        setLectures(data);
      } catch (err) {
        setError("Failed to load lectures.");
      } finally {
        setLoading(false);
      }
    }

    loadLectures();
  }, [courseId]);

  const filteredLectures = lectures.filter((l: Lecture) =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteLecture(id); // ✅ real API delete
      setLectures((prev) => prev.filter((lec) => lec.id !== id));
    } catch (err) {
      alert("Failed to delete lecture.");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Course Lectures</h2>

        {role === Role.Admin && (
          <button
            onClick={() => navigate(`/course/${courseId}/lectures/new`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition cursor-pointer"
          >
            + Add New Lecture
          </button>
        )}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search lectures..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border">
        {loading ? (
          <p className="p-4 text-gray-500">Loading lectures...</p>
        ) : error ? (
          <p className="p-4 text-red-500">{error}</p>
        ) : (
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Lecture No.</th>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLectures.map((lecture: Lecture, index: number) => (
                <tr key={lecture.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{lecture.title}</td>
                  <td className="p-3">{lecture.description}</td>
                  <td className="p-3">{lecture.duration} min</td>

                  <td className="p-3 space-x-2">
                    {role === Role.Admin ? (
                      <>
                        <button
                          className="text-blue-600 hover:underline cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/course/${courseId}/lectures/${lecture.id}/edit`,
                              {
                                state: { lecture },
                              }
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline cursor-pointer"
                          onClick={() => handleDelete(lecture.id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <Link
                        to={`/course/${courseId}/lecture/${lecture.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition cursor-pointer inline-block"
                      >
                        Watch
                      </Link>
                    )}
                  </td>
                </tr>
              ))}

              {filteredLectures.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No lectures found.
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

export default LecturesList;
