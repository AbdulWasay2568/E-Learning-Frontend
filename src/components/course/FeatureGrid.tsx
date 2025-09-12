import { Video, FileText, Users, Bot, BookOpen } from "lucide-react";

const features = [
  {
    title: "Video Lectures",
    description: "Watch high-quality video content from instructors.",
    icon: <Video className="w-8 h-8 text-violet-500" />,
  },
  {
    title: "AI Notes",
    description: "AI-generated lecture notes from videos.",
    icon: <FileText className="w-8 h-8 text-violet-500" />,
  },
  {
    title: "Chatbot Assistant",
    description: "Ask questions & get instant AI responses.",
    icon: <Bot className="w-8 h-8 text-violet-500" />,
  },
  {
    title: "Student Groups",
    description: "Join or create study groups.",
    icon: <Users className="w-8 h-8 text-violet-500" />,
  },
  {
    title: "Summarized Notes",
    description: "Condensed key points of long texts.",
    icon: <BookOpen className="w-8 h-8 text-violet-500" />,
  },
];

export default function FeatureGrid() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
