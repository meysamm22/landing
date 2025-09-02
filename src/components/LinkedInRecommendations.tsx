import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export function LinkedInRecommendations() {
  const [api, setApi] = useState<any>(null);

  const recommendations = [
    {
      name: "Khosro Pakmanesh",
      position: "Senior .Net Developer",
      company: "",
      text: "I have had the distinct pleasure of having Maysam Zarei as a colleague at RdSysCo. Maysam is a friendly individual who gets along well with colleagues at their own level and is highly respected both personally and professionally. He has demonstrated wonderful initiative and a positive attitude and both qualities have made him a valuable member of our team. A good thing about him is that he is an innovative self-starter, who rarely requires supervision, is punctual, typically exceeds expectations, manages stress well and voluntarily works overtime to meet a deadline. The mentioned attributes make him able to find the weak links and fix problems before they arise. Last but not least, He invests a considerable amount of his time into personal growth including betterment of his soft and hard skills. I believe Maysam is a great asset to any company standing a chance of working with him. It is an honor to recommend Maysam to anyone who wants great results."
    },
    {
      name: "Omid Mohebbi",
      position: "Senior Software Engineer",
      company: "",
      text: "I'm really keen on working with Meysam Because I've found him as a people person who works well in a team and has demonstrated a wonderful initiative and commitment. Also, Meysam has a passionate interest in continuous learning, and honestly, he is an expert in time management and is able to meet tight deadlines."
    },
    {
      name: "Sina Sadrzadeh",
      position: "React Developer",
      company: "",
      text: "So trusted guy you enjoy working with him. Polite and Patient who you can discuss challenging points with. An all day learner who is eager to read. He spreads his knowledge with no hesitation. Just let him know the goal, he finds out how to achieve it."
    },
    {
      name: "Mehrdad Hedayati",
      position: "Full-Stack Engineer",
      company: "",
      text: "Making the work fun while maintaining the balance throughout the organization is a central part of his character. You'd be glad to work with Meysam for his leadership, teamwork attitude, and expertise."
    },
    {
      name: "Marcel Martinez Otano",
      position: "Webentwickler",
      company: "",
      text: "I've had the privilege of working alongside Meysam, and I can say without hesitation that he's an exceptional mentor and team member. When I first started, he went above and beyond to help me get up to speed, patiently guiding me through our processes and codebase with remarkable clarity. What sets him apart is his ability to explain complex concepts in just the right way, never overwhelming with unnecessary details, yet never leaving gaps in understanding. Whenever I encountered challenges or got stuck on a problem, he was always willing to step in and provide guidance, making himself available without hesitation. Beyond his technical skills, his willingness to support colleagues and help them grow makes him an invaluable team asset. Any organization would benefit greatly from having someone with his dedication to both excellence and team success."
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Increased interval for longer texts

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            نظر همکاران در لینکدین
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {recommendations.map((recommendation, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2 xl:basis-1/3">
                  <Card className="p-6 lg:p-8 bg-white hover:shadow-xl transition-all duration-500 border-0 rounded-3xl h-full">
                    <div className="flex flex-col h-full">
                      {/* Quote icon */}
                      <div className="mb-4" dir="ltr">
                        <Quote className="w-8 h-8 text-blue-500" />
                      </div>
                      
                      {/* Recommendation text with scroll */}
                      <div className="flex-1 mb-6">
                        <ScrollArea className="h-48 pr-4" dir="ltr">
                          <p className="text-gray-700 leading-relaxed text-left">
                            "{recommendation.text}"
                          </p>
                        </ScrollArea>
                      </div>
                      
                      {/* Author info */}
                      <div className="border-t border-gray-100 pt-4" dir="ltr">
                        <h4 className="font-bold text-gray-900 mb-1 text-left">
                          {recommendation.name}
                        </h4>
                        <p className="text-sm text-gray-600 text-left">
                          {recommendation.position}
                        </p>
                        {recommendation.company && (
                          <p className="text-sm text-blue-600 text-left">
                            {recommendation.company}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>
        
        {/* LinkedIn mention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-sm">
            نظرات واقعی همکاران از پروفایل لینکدین میثم زارعی
          </p>
        </motion.div>
      </div>
    </section>
  );
}