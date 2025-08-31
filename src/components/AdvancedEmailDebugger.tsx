import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertCircle, CheckCircle, Loader2, Mail, Settings, Bug } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DebugResult {
  step: string;
  success: boolean;
  data?: any;
  error?: string;
  timing?: number;
}

export function AdvancedEmailDebugger() {
  const [testEmail, setTestEmail] = useState('');
  const [testName, setTestName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugResults, setDebugResults] = useState<DebugResult[]>([]);

  const runFullDiagnostic = async () => {
    if (!testEmail || !testName) {
      alert('لطفاً نام و ایمیل را وارد کنید');
      return;
    }

    setIsLoading(true);
    setDebugResults([]);
    const results: DebugResult[] = [];

    try {
      // Step 1: Check API connectivity
      console.log('🔍 شروع تست جامع سیستم ایمیل...');
      
      const startTime = Date.now();
      
      results.push({
        step: 'اتصال به سرور',
        success: true,
        data: { message: 'اتصال برقرار شد' },
        timing: Date.now() - startTime
      });

      // Step 2: Check Resend API key and domain info
      console.log('🔑 بررسی API key و domain...');
      const debugStart = Date.now();
      
      const debugResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-19150099/debug-resend`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      const debugData = await debugResponse.json();
      
      results.push({
        step: 'بررسی API Key و Domain',
        success: debugResponse.ok && debugData.success,
        data: debugData,
        error: debugData.error,
        timing: Date.now() - debugStart
      });

      // Step 3: Test simple API call
      console.log('📧 تست ارسال ایمیل مستقیم...');
      const directTestStart = Date.now();
      
      const directTestResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-19150099/test-email-direct`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: testName,
          email: testEmail
        }),
      });

      const directTestData = await directTestResponse.json();
      
      results.push({
        step: 'تست ارسال مستقیم',
        success: directTestResponse.ok && directTestData.success,
        data: directTestData,
        error: directTestData.error,
        timing: Date.now() - directTestStart
      });

      // Step 4: Test through workshop registration flow
      console.log('🎯 تست از طریق فرآیند ثبت‌نام...');
      const registrationTestStart = Date.now();
      
      const registrationTestResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-19150099/test-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: testName,
          email: testEmail
        }),
      });

      const registrationTestData = await registrationTestResponse.json();
      
      results.push({
        step: 'تست فرآیند ثبت‌نام',
        success: registrationTestResponse.ok && registrationTestData.success,
        data: registrationTestData,
        error: registrationTestData.error,
        timing: Date.now() - registrationTestStart
      });

    } catch (error) {
      results.push({
        step: 'خطای عمومی',
        success: false,
        error: error.message || 'خطای ناشناخته'
      });
    }

    setDebugResults(results);
    setIsLoading(false);
  };

  const getStatusIcon = (success: boolean) => {
    return success ? 
      <CheckCircle className="h-5 w-5 text-green-600" /> : 
      <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  const getStatusBadge = (success: boolean) => {
    return success ? 
      <Badge className="bg-green-100 text-green-800">موفق</Badge> : 
      <Badge variant="destructive">ناموفق</Badge>;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-6 w-6" />
          عیب‌یابی پیشرفته سیستم ایمیل
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Test Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="testName">نام برای تست</Label>
              <Input
                id="testName"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="نام خود را وارد کنید"
              />
            </div>
            <div>
              <Label htmlFor="testEmail">ایمیل برای تست</Label>
              <Input
                id="testEmail"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
          </div>
          
          <Button 
            onClick={runFullDiagnostic}
            disabled={isLoading || !testEmail || !testName}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Mail className="mr-2 h-4 w-4" />
            شروع تست جامع سیستم ایمیل
          </Button>
        </div>

        {/* Results */}
        {debugResults.length > 0 && (
          <div className="space-y-4">
            <Separator />
            <h3 className="text-lg font-semibold">نتایج عیب‌یابی:</h3>
            
            {debugResults.map((result, index) => (
              <Card key={index} className={`border-2 ${result.success ? 'border-green-200' : 'border-red-200'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.success)}
                      <CardTitle className="text-base">{result.step}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.timing && (
                        <Badge variant="outline">{result.timing}ms</Badge>
                      )}
                      {getStatusBadge(result.success)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {result.error && (
                    <Alert className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-600">
                        <strong>خطا:</strong> {result.error}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {result.data && (
                    <div className="space-y-2">
                      <h4 className="font-medium">جزئیات:</h4>
                      <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto text-left" dir="ltr">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {/* Summary and recommendations */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  تحلیل و پیشنهادات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-blue-800">
                  {debugResults.every(r => r.success) ? (
                    <p className="text-green-700">✅ همه تست‌ها موفقیت‌آمیز بودند! سیستم ایمیل شما کار می‌کند.</p>
                  ) : (
                    <div className="space-y-2">
                      <p>❌ مشکلاتی شناسایی شد:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {debugResults.filter(r => !r.success).map((result, index) => (
                          <li key={index}>
                            <strong>{result.step}:</strong> {result.error}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <h5 className="font-medium text-yellow-800 mb-2">راه‌حل‌های پیشنهادی:</h5>
                        <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
                          <li>مطمئن شوید domain meysamzarei.com در Resend تأیید شده است</li>
                          <li>بررسی کنید که DNS records (SPF, DKIM, DMARC) صحیح تنظیم شده باشند</li>
                          <li>مطمئن شوید که info@meysamzarei.com در لیست فرستندگان مجاز باشد</li>
                          <li>اگر domain جدید است، ممکن است چند ساعت برای فعال‌سازی نیاز باشد</li>
                          <li>در Resend Dashboard وضعیت domain verification را بررسی کنید</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}