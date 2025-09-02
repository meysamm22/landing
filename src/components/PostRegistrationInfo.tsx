import { motion } from "motion/react";
import { Mail, Calendar, Clock, Video } from "lucide-react";

export function PostRegistrationInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">
          📧 بعد از ثبت‌نام چه اتفاقی می‌افتد؟
        </h3>
        <p className="text-blue-700">
          مراحل بعدی برای شرکت در ورکشاپ
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">
              ایمیل تأیید فوری
            </h4>
            <p className="text-sm text-gray-600">
              بلافاصله ایمیل تشکر و جزئیات ورکشاپ برای شما ارسال می‌شود
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">
              یادآوری ۲۴ ساعته
            </h4>
            <p className="text-sm text-gray-600">
              یک روز قبل از ورکشاپ، لینک اتصال برای شما ارسال می‌شود
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">
              یادآوری ۱ ساعته
            </h4>
            <p className="text-sm text-gray-600">
              یک ساعت قبل از شروع، یادآوری نهایی ارسال می‌شود
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">
              ضبط ورکشاپ
            </h4>
            <p className="text-sm text-gray-600">
              اگر نتوانید حضور پیدا کنید، لینک ضبط شده ارسال می‌شود
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-600 text-lg">💡</span>
          <h4 className="font-bold text-yellow-800">نکته مهم</h4>
        </div>
        <p className="text-sm text-yellow-700">
          حتماً پوشه اسپم ایمیل‌تان را هم چک کنید. اگر ایمیل دریافت نکردید، با ما تماس بگیرید.
        </p>
      </div>
    </motion.div>
  );
}