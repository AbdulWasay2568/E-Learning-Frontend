import React from "react";
import FeatureGrid from "../components/course/FeatureGrid";

const AboutUs: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>

      <p className="text-lg text-gray-600">
        Welcome to <span className="text-red-500 font-semibold">EduSphere</span>,
        your trusted platform for accessible, high-quality online learning.
        We are passionate about empowering learners across the globe to gain
        skills, knowledge, and confidence through engaging, affordable, and
        industry-relevant courses.
      </p>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600">
          Our mission is to make learning easy, flexible, and impactful for
          everyone. We connect learners with expert instructors, offer practical
          hands-on learning opportunities, and continuously update our resources
          to match the fast-changing job market.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p className="text-gray-600">
          Founded in 2025, EduSphere started with a simple vision — to break down
          barriers to education and make high-quality courses available to
          everyone, anywhere. From a small group of passionate educators, we have
          grown into a global community of learners and instructors, united by a
          love for lifelong learning.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Expert-led courses designed for real-world application.</li>
          <li>Flexible learning — anytime, anywhere.</li>
          <li>Interactive tools, quizzes, and projects for practical skills.</li>
          <li>Affordable pricing with lifetime access to course content.</li>
          <li>Supportive community of learners and instructors.</li>
        </ul>
      </section>

      <section>
        <FeatureGrid />
      </section>

      <section>
        <p className="text-gray-700 text-center">
          At EduSphere, we believe that learning should never stop. Whether
          you’re starting your career, switching paths, or simply exploring new
          interests, we’re here to guide you every step of the way.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
