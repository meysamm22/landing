import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function EmailDebugger() {
  const [testEmail, setTestEmail] = useState('');
  const [testName, setTestName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testEmailSend = async () => {
    if (!testEmail || !testName) {
      setResult({ error: 'لطفاً نام و ایمیل وارد کنید' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Test direct email API first
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-19150099/test-email-direct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          name: testName,
          email: testEmail
        })
      });

      const data = await response.json();
      setResult({
        status: response.status,
        success: data.success,
        error: data.error,
        result: data.result,
        debug: data.debug,
        fullResponse: data
      });

    } catch (error) {
      setResult({
        error: 'خطا در اتصال به سرور',
        details: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>🔍 تست ارسال ایمیل</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="نام تست"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
          <Input
            placeholder="ایمیل تست"
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={testEmailSend} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'در حال ارسال...' : 'تست ارسال ایمیل'}
        </Button>

        {result && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">نتیجه تست:</h3>
            <pre className="text-sm overflow-auto whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}