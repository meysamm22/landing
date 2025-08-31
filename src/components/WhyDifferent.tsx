import { motion } from "motion/react";
import { Award, Target, Globe2, Users } from "lucide-react";

export function WhyDifferent() {
  const features = [
    {
      icon: Award,
      title: "۹ سال تجربه",
      description: "تجربه کاری در پروژه‌های بزرگ و بین‌المللی"
    },
    {
      icon: Target,
      title: "پروژه‌های واقعی",
      description: "کار روی پروژه‌هایی که در دنیای واقعی استفاده می‌شن"
    },
    {
      icon: Globe2,
      title: "تجربه بین‌المللی",
      description: "سابقه کار در آلمان و با تیم‌های چندملیتی"
    },
    {
      icon: Users,
      title: "منتورینگ جونیورها",
      description: "سال‌ها تجربه در راهنمایی و آموزش تازه‌کارها"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            چرا این ورکشاپ متفاوت است؟
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}