import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function TestEmailButton() {
  const [testEmail, setTestEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const [debugResult, setDebugResult] = useState<any>(null);

  const testEmailSending = async () => {
    if (!testEmail) {
      toast.error('لطفاً ایمیل تست را وارد کنید');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19150099/test-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ 
            name: 'کاربر تست',
            email: testEmail 
          }),
        }
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Check if response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        setLastResult({ 
          success: false, 
          error: `Server returned ${response.status}: ${textResponse.slice(0, 200)}...` 
        });
        toast.error('سرور پاسخ غیرمنتظره‌ای داد');
        return;
      }

      const result = await response.json();
      setLastResult(result);

      if (result.success) {
        if (result.mock) {
          if (result.reason === 'domain_not_verified') {
            toast.warning('⚠️ ایمیل شبیه‌سازی شد - فقط برای mey.zarei@gmail.com ایمیل واقعی ارسال می‌شود');
          } else {
            toast.warning('ایمیل شبیه‌سازی شد - API key نیاز به تنظیم دارد');
          }
        } else {
          toast.success('ایمیل تست با موفقیت ارسال شد! 🎉');
        }
      } else {
        console.error('Email test failed:', result);
        toast.error(result.error || result.message || 'خطا در ارسال ایمیل');
      }
    } catch (error) {
      console.error('Test email error:', error);
      setLastResult({ success: false, error: error.message });
      toast.error(`خطا در ارسال درخواست: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const checkApiKey = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19150099/debug-resend`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const result = await response.json();
      setDebugResult(result);

      if (result.success) {
        toast.success('API key معتبر است! ✅');
      } else {
        toast.error(`API key نامعتبر: ${result.error}`);
      }
    } catch (error) {
      console.error('Debug API key error:', error);
      toast.error(`خطا در بررسی API key: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          تست ارسال ایمیل
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-amber-800">
            ℹ️ <strong>نکته:</strong> حساب Resend در حالت testing است. ایمیل واقعی فقط به 
            <code className="mx-1 px-1 bg-amber-100 rounded">mey.zarei@gmail.com</code> 
            ارسال می‌شود. سایر ایمیل‌ها شبیه‌سازی خواهند شد.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="ایمیل تست را وارد کنید"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            dir="ltr"
          />
          <Button 
            onClick={testEmailSending}
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? 'در حال ارسال...' : 'تست'}
          </Button>
        </div>
        
        <Button 
          onClick={checkApiKey}
          disabled={isLoading}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {isLoading ? 'در حال بررسی...' : 'بررسی API Key'}
        </Button>
        
        {debugResult && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">بررسی API Key</span>
            </div>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-32">
              {JSON.stringify(debugResult, null, 2)}
            </pre>
          </div>
        )}
        
        {lastResult && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {lastResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm font-medium">
                {lastResult.success ? 'موفق' : 'ناموفق'}
              </span>
            </div>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-32">
              {JSON.stringify(lastResult, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}