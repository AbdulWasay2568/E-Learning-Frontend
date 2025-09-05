import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, X as Cross } from "lucide-react";
import myimage from "../../assets/Images/Chapters/first.webp";

interface MyAllCourses {
  chapterNo: number;
  chapterName: string;
  description: string;
}

interface About {
  name: string;
  about: string;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  let chapters: MyAllCourses[] = [];
  let mydescription: About[] = [];

  if (id === "WebDevelopment") {
    chapters = [
      { chapterNo: 1, chapterName: "HTML Basics", description: "Introduction to HTML structure and tags." },
      { chapterNo: 2, chapterName: "CSS Styling", description: "Learn how to style your web pages with CSS." },
      { chapterNo: 3, chapterName: "JavaScript Essentials", description: "Make your pages interactive with JavaScript." },
      { chapterNo: 4, chapterName: "Responsive Design", description: "Make your website mobile-friendly with media queries." },
      { chapterNo: 5, chapterName: "DOM Manipulation", description: "Interact with the DOM using JavaScript." },
      { chapterNo: 6, chapterName: "Web Forms & Validation", description: "Create and validate user input forms." },
      { chapterNo: 7, chapterName: "Intro to APIs", description: "Fetch external data using APIs." },
    ];

    mydescription = [
      {
        name: "Web Development",
        about:
          "This comprehensive course is designed to take you from the basics of website creation to building complex, dynamic web applications. You'll begin with HTML, CSS, and JavaScript, gradually moving on to React, Node.js, and databases. By the end, you’ll be job-ready in web development.",
      },
    ];
  }

  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [heights, setHeights] = useState([5, 7, 9, 2]);
  const [forceShow, setForceShow] = useState<boolean>(false);

  const myToggle = (chapterNo: number) => {
    setActiveChapter((e) => (e === chapterNo ? null : chapterNo));
  };

  const myEqualizer = (chapterNo: number) => {
    setHighlight((e) => (e === chapterNo ? null : chapterNo));
  };

  useEffect(() => {
    if (highlight !== null) {
      const interval = setInterval(() => {
        setHeights((h) => h.map(() => 5 + Math.random() * 10));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [highlight]);

  return (
    <div className="flex flex-col lg:flex-row container mx-auto mt-16 px-4">
      {/* Left side: video + about */}
      <div className="flex flex-col items-start">
        <div className="w-[300px] h-[150px] sm:w-[355px] sm:h-[210px] lg:w-[550px] lg:h-[390px] rounded-2xl overflow-hidden">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            width="100%"
            height="100%"
            controls
            muted
          />
        </div>

        {mydescription.map((e) => (
          <div key={e.name} className={`${forceShow ? "block w-full lg:w-[550px]" : "hidden lg:block lg:w-[550px]"} mt-6`}>
            <h3 className="text-lg font-semibold">{e.name} Course</h3>
            <h2 className="mt-3 text-sm font-bold">About Course</h2>
            <p className="mt-4 text-justify">{e.about}</p>
          </div>
        ))}
      </div>

      {/* Right side: playlist */}
      <div className="bg-gray-100 rounded-2xl w-full lg:ml-6 mt-6 lg:mt-0 p-6 relative">
        {/* Cross Button (Mobile) */}
        <div className="lg:hidden flex justify-end mb-2">
          <Cross
            onClick={() => setForceShow(!forceShow)}
            className={`${forceShow ? "hidden" : "block"} w-6 h-6 cursor-pointer`}
          />
        </div>

        {/* Show Playlist Button (Mobile) */}
        <div
          className={`${forceShow ? "flex" : "hidden lg:flex"} justify-between items-center cursor-pointer pb-4`}
          onClick={() => setForceShow(!forceShow)}
        >
          <p className="text-base font-medium">Show Playlist</p>
          <ChevronUp className="w-4 h-4" />
        </div>

        {chapters.map((e) => {
          const active = activeChapter === e.chapterNo;
          const equalizer = highlight === e.chapterNo;

          return (
            <div
              key={e.chapterNo}
              className={`${forceShow ? "hidden lg:block" : "block"} mb-10`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Thumbnail */}
                  <div
                    className="w-[100px] h-[66px] mr-2 cursor-pointer"
                    onClick={() => myEqualizer(e.chapterNo)}
                  >
                    <img src={myimage} alt="chapter" className="rounded-lg w-full h-full object-cover" />
                  </div>

                  <h3
                    className="font-medium cursor-pointer"
                    onClick={() => myEqualizer(e.chapterNo)}
                  >
                    Chapter {e.chapterNo}: {e.chapterName}
                  </h3>

                  {/* Equalizer */}
                  <div className={`${equalizer ? "flex" : "hidden"} items-end gap-1 h-8 ml-2`}>
                    {heights.map((h, i) => (
                      <div
                        key={i}
                        className="w-[3px] bg-black rounded-sm transition-all duration-200"
                        style={{ height: `${h}px` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Chevron */}
                <ChevronDown
                  onClick={() => myToggle(e.chapterNo)}
                  className={`${active ? "rotate-180" : ""} w-4 h-4 cursor-pointer`}
                />
              </div>

              {/* Description */}
              <p className={`${active ? "block mt-3" : "hidden"} text-sm`}>
                {e.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetail;
