import React, { useEffect, useState } from "react";

interface NotesSectionProps {
  lectureId: number;
}

const NotesSection: React.FC<NotesSectionProps> = ({ lectureId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState<string>("Loading notes...");

  // ✅ Fetch notes from backend (or keep placeholder for now)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Later you can replace this with real API call:
        // const res = await fetch(`/api/lectures/${lectureId}/notes`);
        // const data = await res.json();
        // setNote(data.text);

        // Placeholder for now
        setNote(
          `This is a placeholder summary for lecture ID: ${lectureId}.
Once connected to backend, this will load the actual notes/summary for the lecture.`
        );
      } catch (error) {
        console.error("Failed to load notes:", error);
        setNote("Failed to load notes.");
      }
    };

    fetchNotes();
  }, [lectureId]);

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Lecture Summary</h2>
      <p
        className={`text-gray-700 text-sm overflow-hidden transition-all duration-300 ${
          isExpanded ? "line-clamp-none" : "line-clamp-2"
        }`}
      >
        {note}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-blue-500 text-sm font-medium hover:underline cursor-pointer"
      >
        {isExpanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
};

export default NotesSection;
