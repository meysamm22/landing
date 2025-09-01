import { Card } from "./ui/card";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Linkedin } from "lucide-react";

export function InstructorProfile() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            معرفی مدرس
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-8 lg:p-12 bg-white rounded-3xl border-0 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-purple-200 shadow-xl">
                  <ImageWithFallback
                    src="/images/profile-picture.jpg"
                    alt="میثم زارعی"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-right">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  میثم زارعی
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  Senior Backend Developer با ۹ سال تجربه در PHP, Java, Microservices و سابقه کار در Check24 آلمان.
                </p>
                
                {/* Experience highlights */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <div className="p-4 bg-purple-50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">9+</div>
                    <div className="text-sm text-gray-600">سال تجربه</div>
                  </div>
                  
                  {/* LinkedIn Button */}
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <a
                      href="https://www.linkedin.com/in/meysamzarei"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="w-5 h-5" />
                      مشاهده پروفایل لینکدین
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}