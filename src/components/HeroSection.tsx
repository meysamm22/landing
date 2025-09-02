import { Button } from "./ui/button";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
            اولین قدمت رو برای ورود به
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              دنیای وب بردار
            </span>
            <span className="text-5xl sm:text-6xl lg:text-8xl">🚀</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
            در ورکشاپ رایگان آنلاین ویژه فارسی‌زبانان، یاد بگیر چطور بدون تجربه قبلی مسیر ورود به دنیای برنامه‌نویسی وب را شروع کنی و Roadmap شغلی خودت را پیدا کنی.
          </p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-4"
          >
            <Button 
              onClick={() => {
                const element = document.getElementById('registration-form');
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              ثبت‌نام رایگان
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}