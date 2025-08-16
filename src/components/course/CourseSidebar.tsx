import React from "react";

interface Lesson {
  title: string;
  duration: string;
  status: "completed" | "playing" | "pending";
  thumbnail: string;
  author?: string;
}

interface CourseSidebarProps {
  chapterTitle: string;
  completedPercent: number;
  lessons: Lesson[];
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  chapterTitle,
  completedPercent,
  lessons,
}) => {
  return (
    <div className="bg-white border rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-bold">{chapterTitle}</h3>
        <p className="text-sm text-gray-500">
          {lessons.length} Lectures • {completedPercent}% completed
        </p>
      </div>

      {/* Playlist style list */}
      <div className="max-h-[500px] overflow-y-auto">
        {lessons.map((lesson) => {
          const isPlaying = lesson.status === "playing";
          return (
            <div
              key={lesson.title}
              className={`flex gap-3 p-2 cursor-pointer hover:bg-gray-100 ${
                isPlaying ? "bg-gray-200" : ""
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-24 h-14 flex-shrink-0">
                <img
                  src={lesson.thumbnail}
                  alt={lesson.title}
                  className="w-full h-full object-cover rounded"
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {lesson.duration}
                </span>
              </div>

              {/* Title & Author */}
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{lesson.title}</span>
                {lesson.author && (
                  <span className="text-xs text-gray-500 truncate">
                    {lesson.author}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSidebar;
