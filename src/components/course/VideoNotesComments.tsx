import React, { useState } from "react";
import NotesSection from "./NotesSection";
import CommentsSection from "./CommentsSection";

const tabs = ["Notes", "Comments"];

const VideoNotesComments: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Notes");

  const renderContent = () => {
    switch (activeTab) {
      case "Notes":
        return <NotesSection />;
      case "Comments":
        return <CommentsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 text-sm sm:text-base cursor-pointer ${
              activeTab === tab
                ? "border-b-2 border-red-500 text-red-500 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default VideoNotesComments;
