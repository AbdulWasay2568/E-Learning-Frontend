import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Lecture {
  id: number;
  title: string;
  videoUrl: string;
  duration: string;
  thumbnail: string;
}

const LecturesPage: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([
    {
      id: 1,
      title: "Introduction to React",
      videoUrl: "https://example.com/video1",
      duration: "15 min",
      thumbnail: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      title: "Advanced State Management",
      videoUrl: "https://example.com/video2",
      duration: "25 min",
      thumbnail: "https://via.placeholder.com/100",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredLectures = lectures.filter((l) =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setLectures(lectures.filter((l) => l.id !== id));
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Course Lectures</h2>
        <button
          onClick={() => navigate("/course/lectures/new")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add New Lecture
        </button>
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
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Thumbnail</th>
              <th className="p-3">Title</th>
              <th className="p-3">Video URL</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLectures.map((lecture) => (
              <tr key={lecture.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={lecture.thumbnail}
                    alt="thumbnail"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-3">{lecture.title}</td>
                <td className="p-3 text-blue-600 underline">
                  <a href={lecture.videoUrl} target="_blank" rel="noreferrer">
                    {lecture.videoUrl}
                  </a>
                </td>
                <td className="p-3">{lecture.duration}</td>
                <td className="p-3 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/course/lectures/${lecture.id}/edit`, { state: { lecture } })}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(lecture.id)}
                  >
                    Delete
                  </button>
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
      </div>
    </div>
  );
};

export default LecturesPage;
