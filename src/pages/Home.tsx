import HeroBanner from "../components/HeroBanner";
import FeatureGrid from "../components/course/FeatureGrid";
import CourseSection from "../components/course/CourseSection";

export default function Home() {
  return (
    <div className="min-h-screen py-8">
      <HeroBanner />
        <div className="px-6 py-8 bg-gray-100 text-gray-800 space-y-16">
        <FeatureGrid />
        <CourseSection />
        </div>  
    </div>
  );
}
