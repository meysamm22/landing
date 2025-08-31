import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

export function ResendSetupGuide() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          راهنمای تنظیم Resend API
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            برای ارسال ایمیل‌های تشکر، نیاز به تنظیم API key Resend دارید.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <h3 className="font-semibold">مراحل تنظیم:</h3>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <strong>۱. ثبت‌نام در Resend:</strong>
                <p className="text-sm text-gray-600">
                  برو به{' '}
                  <a 
                    href="https://resend.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 underline inline-flex items-center gap-1"
                  >
                    resend.com
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {' '}و حساب بساز
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <strong>۲. ساخت API Key:</strong>
                <ul className="text-sm text-gray-600 mr-4 list-disc">
                  <li>از منوی چپ "API Keys" را انتخاب کن</li>
                  <li>روی "Create API Key" کلیک کن</li>
                  <li>نام: Workshop Email API</li>
                  <li>Permission: Sending access</li>
                  <li>روی "Add" کلیک کن</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <strong>۳. کپی کردن API Key:</strong>
                <p className="text-sm text-gray-600">
                  API key شروع می‌شود با <code className="bg-gray-100 px-1 rounded">re_</code> و حدود ۳۵-۴۰ کاراکتر دارد
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <strong>۴. تنظیم در سیستم:</strong>
                <p className="text-sm text-gray-600">
                  API key را در تنظیمات پروژه قرار بده
                </p>
              </div>
            </div>
          </div>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>نکته:</strong> تا زمانی که API key تنظیم نشود، ایمیل‌ها شبیه‌سازی می‌شوند و ثبت‌نام‌ها همچنان کار می‌کنند.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}