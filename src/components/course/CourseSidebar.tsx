import React from "react";
import thumb from "../../assets/Images/Courses/WebDev.jpg";

interface Lesson {
  title: string;
  duration: number; // store duration in SECONDS
  status: "completed" | "playing" | "pending";
  thumbnail: string;
  author?: string;
}

interface CourseSidebarProps {
  chapterTitle: string;
  completedPercent: number;
  lessons: Lesson[];
}

// Helper to format seconds → HH:MM:SS
const formatDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    hrs.toString().padStart(2, "0"),
    mins.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
};

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  chapterTitle,
  completedPercent,
  lessons,
}) => {
  return (
    <aside className="bg-white border rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-bold">{chapterTitle}</h3>
        <p className="text-sm text-gray-600">
          {lessons.length} Lectures • {completedPercent}% completed
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completedPercent}%` }}
          />
        </div>
      </div>

      {/* Lessons list */}
      <div className="max-h-[500px] overflow-y-auto divide-y">
        {lessons.map((lesson) => {
          const isPlaying = lesson.status === "playing";
          const isCompleted = lesson.status === "completed";

          return (
            <button
              key={lesson.title}
              className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                isPlaying ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-24 h-14 flex-shrink-0">
                <img
                  src={thumb}
                  alt={lesson.title}
                  className="w-full h-full object-cover rounded"
                />
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {lesson.duration}
                </span>
              </div>

              {/* Title & Author */}
              <div className="flex flex-col overflow-hidden">
                <span
                  className={`text-sm font-medium truncate ${
                    isPlaying ? "text-blue-600" : ""
                  }`}
                >
                  {lesson.title}
                </span>
                {lesson.author && (
                  <span className="text-xs text-gray-500 truncate">
                    {lesson.author}
                  </span>
                )}
              </div>

              {/* Status Indicator */}
              <div className="ml-auto">
                {isPlaying && (
                  <span className="text-xs font-semibold text-blue-600">
                    Now Playing
                  </span>
                )}
                {isCompleted && (
                  <span className="text-xs text-green-600">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default CourseSidebar;
