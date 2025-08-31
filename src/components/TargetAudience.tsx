import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Users, GraduationCap, Globe } from "lucide-react";

export function TargetAudience() {
  const targetGroups = [
    {
      icon: Users,
      title: "افراد بدون تجربه برنامه‌نویسی",
      description: "اگر هیچ پیش‌زمینه‌ای در کدنویسی نداری و می‌خوای از صفر شروع کنی"
    },
    {
      icon: GraduationCap,
      title: "جونیورها و تازه‌کارها",
      description: "اگر تازه وارد این حوزه شدی و می‌خوای مسیرت رو پیدا کنی"
    },
    {
      icon: Globe,
      title: "مهاجرها و دانشجوهای فارسی‌زبان",
      description: "اگر در خارج از کشور هستی و به محتوای فارسی دسترسی محدودی داری"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            این ورکشاپ برای چه کسانی مناسب است؟
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {targetGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="p-8 text-center bg-white hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl h-full">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <group.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {group.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {group.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}