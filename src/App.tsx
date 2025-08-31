import { HeroSection } from "./components/HeroSection";
import { TargetAudience } from "./components/TargetAudience";
import { WorkshopContent } from "./components/WorkshopContent";
import { WhyDifferent } from "./components/WhyDifferent";
import { InstructorProfile } from "./components/InstructorProfile";

import { WorkshopDetails } from "./components/WorkshopDetails";
import { RegistrationForm } from "./components/RegistrationForm";

import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Import Persian fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      <style jsx global>{`
        * {
          font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>
      
      <main>
        <HeroSection />
        <TargetAudience />
        <WorkshopContent />
        <WhyDifferent />
        <InstructorProfile />
        <WorkshopDetails />
        <RegistrationForm />
      </main>
      
      <Toaster position="top-center" />
    </div>
  );
}