import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../../components/course/VideoPlayer";
import CourseSidebar from "../../components/course/CourseSidebar";
import VideoNotesComments from "../../components/course/VideoNotesComments";
import {
  fetchLecturesByCourse,
  fetchLectureById,
} from "../../services/lectureService";

interface Lecture {
  id: number;
  title: string;
  description?: string;
  duration: number;
  videoUrl: string;
  thumbnail?: string;
  teacher?: { name: string };
  courseId: number;
}

const LecturePage: React.FC = () => {
  const { courseId, lectureId } = useParams<{
    courseId: string;
    lectureId: string;
  }>();

  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLectures = async () => {
      try {
        if (!courseId) return;

        // ✅ Fetch all lectures of this course
        const allLectures = await fetchLecturesByCourse(Number(courseId));
        setLectures(allLectures);

        if (lectureId) {
          // ✅ Fetch current lecture by ID
          const selectedLecture = await fetchLectureById(Number(lectureId));
          setLecture(selectedLecture);
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLectures();
  }, [courseId, lectureId]);

  if (loading) {
    return <p className="text-center mt-10">Loading lecture...</p>;
  }

  if (!lecture) {
    return <p className="text-center mt-10">Lecture not found.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-6">
      {/* Main Lecture Section */}
      <div className="lg:col-span-2 space-y-4">
        <VideoPlayer videoUrl={lecture.videoUrl} />
        <VideoNotesComments lectureId={lecture.id} />
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <CourseSidebar
          chapterTitle="Web Development Course"
          completedPercent={12} // TODO: replace with real progress
          lessons={lectures.map((lec) => ({
            title: lec.title,
            duration: `${lec.duration} min`,
            status: lec.id === lecture.id ? "playing" : "pending",
            thumbnail: lec.thumbnail || "",
            author: lec.teacher?.name || "Unknown",
          }))}
        />
      </div>
    </div>
  );
};

export default LecturePage;
