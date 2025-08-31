import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { RegistrationStats } from "./RegistrationStats";
import { PostRegistrationInfo } from "./PostRegistrationInfo";

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ name: '', email: '' });
    
    let hasErrors = false;
    const newErrors = { name: '', email: '' };
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'نام و نام خانوادگی اجباری است';
      hasErrors = true;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل اجباری است';
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      toast.error("لطفاً خطاهای فرم را برطرف کنید");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to backend
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-19150099/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          country: formData.country || undefined
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Registration API error:', result);
        
        // Handle specific error types
        if (response.status === 409 && result.errorType === 'DUPLICATE_EMAIL') {
          setErrors(prev => ({ ...prev, email: result.error }));
          // Focus on email field to draw attention
          const emailField = document.getElementById('email');
          if (emailField) {
            emailField.focus();
          }
          return;
        }
        
        throw new Error(result.error || 'خطایی در ثبت‌نام رخ داده است');
      }

      if (result.success) {
        const successMessage = result.emailSent 
          ? "🎉 ثبت‌نام موفقیت‌آمیز! ایمیل تأیید برای شما ارسال شد. لطفاً ایمیل‌تان را چک کنید."
          : "🎉 ثبت‌نام موفقیت‌آمیز! لینک ورکشاپ به زودی برای شما ارسال خواهد شد.";
          
        toast.success(successMessage, {
          duration: 6000,
        });
        setFormData({ name: '', email: '', country: '' });
        setErrors({ name: '', email: '' });
      } else {
        throw new Error(result.error || 'خطایی در ثبت‌نام رخ داده است');
      }

    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'خطایی در ثبت‌نام رخ داده است. لطفاً دوباره تلاش کنید.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration-form" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full opacity-20 blur-3xl" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            ثبت‌نام در ورکشاپ
          </h2>
          <p className="text-xl text-gray-200">
            همین حالا جات رو رزرو کن!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <RegistrationStats />
          
          <Card className="p-8 lg:p-12 bg-white/95 backdrop-blur-sm border-0 rounded-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-900 mb-2 block">
                  نام و نام خانوادگی <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-colors ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-purple-500'
                  }`}
                  dir="rtl"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-900 mb-2 block">
                  ایمیل <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-purple-500'
                  }`}
                  dir="ltr"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="country" className="text-gray-900 mb-2 block">
                  کشور محل سکونت <span className="text-gray-500">(اختیاری)</span>
                </Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                  <SelectTrigger className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors">
                    <SelectValue placeholder="کشور خود را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iran">ایران</SelectItem>
                    <SelectItem value="usa">آمریکا</SelectItem>
                    <SelectItem value="canada">کانادا</SelectItem>
                    <SelectItem value="germany">آلمان</SelectItem>
                    <SelectItem value="uk">انگلستان</SelectItem>
                    <SelectItem value="australia">استرالیا</SelectItem>
                    <SelectItem value="turkey">ترکیه</SelectItem>
                    <SelectItem value="uae">امارات</SelectItem>
                    <SelectItem value="other">سایر کشورها</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'در حال ثبت‌نام...' : 'ثبت‌نام در ورکشاپ رایگان'}
              </Button>
            </form>
          </Card>
          
          <PostRegistrationInfo />
        </motion.div>
      </div>
    </section>
  );
}