import React, { useState } from "react";

const NotesSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const text = `This lecture covers the basics of Vue.js, including installation, 
component structure, and templating syntax. You’ll learn how to 
create reusable UI components and bind data dynamically. Vue.js 
offers reactive data binding, directives, and a virtual DOM for 
efficient updates. You'll also explore props, events, and slots 
for component communication, and learn best practices for 
structuring large-scale Vue applications.`;

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Lecture Summary</h2>
      <p
        className={`text-gray-700 text-sm overflow-hidden transition-all duration-300 ${
          isExpanded ? "line-clamp-none" : "line-clamp-2"
        }`}
      >
        {text}
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
