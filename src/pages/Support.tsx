import React, { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

interface MyQuestions {
  id: number;
  q: string;
  a: string;
}

const Support: React.FC = () => {
  const allQuestions: MyQuestions[] = [
    {
      id: 1,
      q: "How do I get access to a course?",
      a: "Select any course available on the home page, and get your learning started.",
    },
    {
      id: 2,
      q: "Can I access my courses offline?",
      a: "Yes, if you have downloaded the lectures then you can access online.",
    },
    {
      id: 3,
      q: "How do I reset my password?",
      a: "Click 'Forgot Password' on the login page, enter your registered email, and follow the instructions sent to your inbox.",
    },
    {
      id: 4,
      q: "Are the courses self-paced?",
      a: "Yes, all our courses are self-paced. You can study at your own convenience and there is no deadline for completion.",
    },
    {
      id: 5,
      q: "Do I get a certificate after completion?",
      a: "Yes, once you complete all lessons and quizzes in a course, you will receive a downloadable and shareable certificate.",
    },
    {
      id: 6,
      q: "What payment methods are supported?",
      a: "The courses are free of cost, you don't have to pay for any course.",
    },
  ];

  const [everyAnswer, setEveryAnswer] = useState<number | null>(null);
  const toggleAnswer = (id: number) => {
    setEveryAnswer(everyAnswer === id ? null : id);
  };

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  return (
    <div className="mt-16 space-y-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-full flex flex-col items-center justify-center h-56 sm:h-44 shadow-lg">
        <span className="text-white text-sm sm:text-base font-medium">
          Welcome to E-Learning Help Center
        </span>
        <h2 className="text-white text-3xl sm:text-4xl font-semibold mt-2 text-center">
          How can we help you?
        </h2>
      </div>

      {/* FAQ Section */}
      <div className="w-full px-4 max-w-4xl mx-auto">
        <h3 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
          Related FAQ's
        </h3>
        <div className="space-y-4">
          {allQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white p-5 shadow-md rounded-2xl hover:shadow-xl  transition-all border border-gray-200"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(q.id)}
              >
                <h3 className="text-blue-900 font-semibold text-lg sm:text-xl">
                  {q.q}
                </h3>
                {everyAnswer === q.id ? (
                  <HiOutlineChevronUp className="text-gray-500 text-2xl" />
                ) : (
                  <HiOutlineChevronDown className="text-gray-500 text-2xl" />
                )}
              </div>
              <p
                className={`text-gray-600 text-sm sm:text-base mt-3 transition-all duration-300 ease-in-out ${
                  everyAnswer === q.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {q.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-full flex flex-col items-center justify-center h-56 sm:h-44 shadow-lg">
        <span className="text-white text-sm sm:text-base font-medium">
          Still Having Queries?
        </span>
        <h2 className="text-white text-3xl sm:text-4xl font-semibold mt-2 text-center">
          Contact Us By Filling The Form Below
        </h2>
      </div>

      {/* Contact Form */}
      <form
        action="https://formspree.io/f/mdkdkybe"
        method="POST"
        className="flex flex-col items-center px-4"
      >
        <div className="flex flex-col gap-4 w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <input
            type="text"
            placeholder="Name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-12 px-4 rounded-lg shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition"
          />
          <input
            type="email"
            placeholder="Email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 px-4 rounded-lg shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition"
          />
          <input
            type="text"
            placeholder="Subject"
            name="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="h-12 px-4 rounded-lg shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition"
          />
          <textarea
            name="Message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            className="resize-none w-full p-4 rounded-lg shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            type="submit"
            className="w-full sm:w-80 h-12 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium self-center cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </form>
    </div>
  );
};

export default Support;
