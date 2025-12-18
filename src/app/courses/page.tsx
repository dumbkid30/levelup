import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CourseList from "@/components/CourseList";
import CourseListBackend from "@/components/CourseListBackend";
import StudentTestimonials from "@/components/StudentTestimonials";
import Footer from "@/components/Footer";

export default function CoursesHome() {
  return (
    <div className="min-h-screen bg-black text-white font-pixel">
      <Navbar />
      <HeroSection />
      <CourseListBackend />
      <CourseList />
      <FeaturesSection />
      <StudentTestimonials />
      <Footer />
    </div>
  );
}
