import BackgroundImageHero from "@/components/BackgroundImageHero";
import ModernServiceCards from "@/components/ModernServiceCards";
import StatsSection from "@/components/StatsSection";
import StudyDestinations from "@/components/StudyDestinations";
import ProfessionalCourses from "@/components/ProfessionalCourses";
import StudentTestimonials from "@/components/StudentTestimonials";
import VideoConsultation from "@/components/VideoConsultation";
import ModernCollaborations from "@/components/ModernCollaborations";
import QuickApplyForm from "@/components/QuickApplyForm";
import Footer from "@/components/Footer";
import FloatingNavigation from "@/components/FloatingNavigation";
import FloatingLogo from "@/components/FloatingLogo";

export default function CareerLaunchpad() {
    return (
        <div className="min-h-screen bg-black">
            <FloatingLogo />
            <BackgroundImageHero />
            <ModernServiceCards />
            <StatsSection />
            <StudyDestinations />
            <ProfessionalCourses />
            <StudentTestimonials />
            <VideoConsultation />
            <ModernCollaborations />
            <QuickApplyForm />
            <Footer />
            <FloatingNavigation />
        </div>
    );
}
