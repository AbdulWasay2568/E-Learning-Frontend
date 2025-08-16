import React from "react";
import VideoPlayer from "../../components/course/VideoPlayer";
import CourseSidebar from "../../components/course/CourseSidebar";
import WebDev from "../../assets/Images/Courses/WebDev.jpg";
import VideoNotesComments from "../../components/course/VideoNotesComments";

const CoursePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-6">
      <div className="lg:col-span-2 space-y-4">
        <VideoPlayer />
        <VideoNotesComments />
      </div>

      <div className="space-y-4">
        <CourseSidebar
          chapterTitle="Web Development Course"
          completedPercent={12}
          lessons={[
            {
              title: "Installing Vue JS",
              duration: "10:00",
              status: "completed",
              thumbnail: WebDev,
              author: "John Doe",
            },
            {
              title: "Understand Vue Components",
              duration: "59:00",
              status: "playing",
              thumbnail: WebDev,
              author: "Jane Smith",
            },
            {
              title: "Vue Templating",
              duration: "12:00",
              status: "pending",
              thumbnail: WebDev,
              author: "John Doe",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CoursePage;
