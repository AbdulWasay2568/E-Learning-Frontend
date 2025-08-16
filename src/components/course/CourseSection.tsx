import { useState } from "react";
import { Search } from "lucide-react";
import CourseCard from "./CourseCard";

import WebDev from "../../assets/Images/Courses/WebDev.jpg";

const courseData = [
  {
    title: "Full-Stack Web Development",
    description: "Build modern websites using HTML, CSS, JS, and React.",
    instructor: "Abdul Wasay",
    rating: 4.8,
    users: "12.2k",
    category: "web",
    image: WebDev
  },
  {
    title: "Mobile App Development",
    description: "Create native mobile apps using React Native.",
    instructor: "Abdul Rehman",
    rating: 4.5,
    users: "9.6k",
    category: "app",
    image: WebDev
  },
  {
    title: "Cloud Fundamentals",
    description: "Learn AWS, Azure, and cloud-native technologies.",
    instructor: "Adeel Ahmed",
    rating: 4.6,
    users: "8.1k",
    category: "cloud",
    image: WebDev
  },
  {
    title: "Frontend with Tailwind CSS",
    description: "Style your websites quickly and beautifully.",
    instructor: "Adeel Ahmed",
    rating: 4.7,
    users: "6.3k",
    category: "web",
    image: WebDev
  },
  {
    title: "App UI/UX Design",
    description: "Design intuitive mobile interfaces and workflows.",
    instructor: "Abdul Rehman",
    rating: 4.4,
    users: "5.2k",
    category: "app",
    image: WebDev
  },
];

export default function CourseSection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courseData.filter(
    (course) =>
      (selectedCategory === "" || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">Explore Courses</h2>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex gap-3 flex-wrap">
          {["web", "app", "cloud"].map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? "" : category
                )
              }
              className={`px-4 py-2 rounded-xl border ${
                selectedCategory === category
                  ? "bg-violet-600 text-white"
                  : "bg-white text-gray-700 hover:bg-violet-100"
              } transition`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 rounded-xl w-full border bg-white shadow-sm focus:ring-2 focus:ring-violet-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCourses.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No courses found.
          </p>
        ) : (
          filteredCourses.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))
        )}
      </div>
    </section>
  );
}
