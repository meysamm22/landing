import { motion } from "motion/react";
import { Code, Rocket, Map, Briefcase } from "lucide-react";

export function WorkshopContent() {
  const content = [
    {
      icon: Map,
      title: "نقشه راه",
      description: "تصویر کامل مسیر یادگیری توسعه وب (Roadmap)"
    },
    {
      icon: Code,
      title: "مهارت های مورد نیاز",
      description: "آشنایی با مهارت‌های لازم برای Frontend، Backend و Database"
    },
    {
      icon: Rocket,
      title: "ابزارها و تکنولوژی‌ها",
      description: "شناخت ابزارها و تکنولوژی‌های موردنیاز برای شروع"
    },
    {
      icon: Briefcase,
      title: "قدم‌های ورود به بازار کار",
      description: "راهکارهای عملی برای ورود به بازار کار IT"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            در این ورکشاپ چه چیزی یاد می‌گیری؟
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="text-center group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}