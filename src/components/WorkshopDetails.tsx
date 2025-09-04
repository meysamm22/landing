import React from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Calendar, Clock, Video, Globe, DollarSign } from "lucide-react";

export function WorkshopDetails() {
  const details = [
    {
      icon: Calendar,
      label: "تاریخ برگزاری",
      value: "یکشنبه ۲۱ سپتامبر ۲۰۲۵"
    },
    {
      icon: Clock,
      label: "زمان",
      value: "۱۹:۰۰ الی ۲۱:۰۰ (بوقت برلین)"
    },
    {
      icon: Video,
      label: "پلتفرم",
      value: "آنلاین - گوگل میت"
    },
    {
      icon: Globe,
      label: "زبان آموزش",
      value: "فارسی (۱۰۰٪)"
    },
    {
      icon: DollarSign,
      label: "هزینه شرکت",
      value: "کاملاً رایگان"
    }
  ];

  const scrollToRegistration = () => {
    const element = document.getElementById('registration-form');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            جزئیات ورکشاپ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-600 mx-auto rounded-full" />
        </motion.div>
        
        {/* Clean table-like design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 mb-12"
        >
          <div className="space-y-6">
            {details.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-6 py-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <detail.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-semibold text-gray-900 text-lg">
                      {detail.label}
                    </span>
                    <span className="text-gray-700 text-lg">
                      {detail.value}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA with scroll functionality */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button 
            onClick={scrollToRegistration}
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            همین حالا ثبت‌نام کن
          </Button>
        </motion.div>
      </div>
    </section>
  );
}