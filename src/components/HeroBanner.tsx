import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Unlock Your Potential with AI Learning",
    subtitle: "Access smart tools, engaging content, and collaborative study features to excel in your studies.",
    image: "https://via.placeholder.com/800x300?text=AI+Learning",
  },
  {
    title: "Summarized Notes & Smart Search",
    subtitle: "Get concise lecture notes and find what you need in seconds with AI-driven search.",
    image: "https://via.placeholder.com/800x300?text=Smart+Notes",
  },
  {
    title: "Collaborate & Grow Together",
    subtitle: "Form student groups, take quizzes, and interact through AI-powered chat support.",
    image: "https://via.placeholder.com/800x300?text=Collaboration",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <div className="relative bg-violet-600 text-white shadow-md overflow-hidden">
      <img
        src={slides[current].image}
        alt="Banner"
        className="w-full h-64 object-cover opacity-70"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-3">{slides[current].title}</h1>
        <p className="text-lg text-violet-200">{slides[current].subtitle}</p>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-violet-700 hover:bg-violet-800 p-2 rounded-full"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-violet-700 hover:bg-violet-800 p-2 rounded-full"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === current ? "bg-white" : "bg-violet-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
