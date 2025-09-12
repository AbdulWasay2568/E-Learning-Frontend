import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import John from "../../assets/Images/John.jpg";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  time: string;
  text: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  lectureId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ lectureId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  // ✅ Fetch comments per lecture
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Replace this with real API call later:
        // const res = await fetch(`/api/lectures/${lectureId}/comments`);
        // const data = await res.json();
        // setComments(data);

        // Mocked comments for now
        setComments([
          {
            id: 1,
            user: "Talha",
            avatar: John,
            time: "2 days ago",
            text: `This is a sample comment for lecture ID: ${lectureId}`,
            likes: 25,
            replies: [
              {
                id: 2,
                user: "Student A",
                avatar: John,
                time: "1 day ago",
                text: "I agree with this point!",
                likes: 5,
              },
            ],
          },
        ]);
      } catch (error) {
        console.error("Failed to load comments:", error);
        setComments([]);
      }
    };

    fetchComments();
  }, [lectureId]);

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>
      {comments.length === 0 && (
        <p className="text-gray-500 text-sm">No comments yet.</p>
      )}

      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          {/* Main comment */}
          <div className="flex items-start space-x-3">
            <img
              src={comment.avatar}
              alt={comment.user}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{comment.user}</span>
                <span className="text-xs text-gray-500">{comment.time}</span>
              </div>
              <p className="text-sm mt-1">{comment.text}</p>
              <div className="flex items-center gap-4 mt-1 text-gray-600 text-sm">
                <button className="flex items-center gap-1 hover:text-blue-500">
                  <FaThumbsUp /> {comment.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-red-500">
                  <FaThumbsDown />
                </button>
                <button className="text-xs hover:underline">Reply</button>
              </div>
            </div>
          </div>

          {/* Replies */}
          {comment.replies && (
            <div className="ml-12 mt-2 space-y-2">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex items-start space-x-3">
                  <img
                    src={reply.avatar}
                    alt={reply.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{reply.user}</span>
                      <span className="text-xs text-gray-500">{reply.time}</span>
                    </div>
                    <p className="text-sm mt-1">{reply.text}</p>
                    <div className="flex items-center gap-4 mt-1 text-gray-600 text-xs">
                      <button className="flex items-center gap-1 hover:text-blue-500">
                        <FaThumbsUp /> {reply.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-red-500">
                        <FaThumbsDown />
                      </button>
                      <button className="hover:underline">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
