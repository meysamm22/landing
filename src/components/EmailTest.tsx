import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from "sonner";
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function EmailTest() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testEmail = async () => {
    if (!email || !name) {
      toast.error('لطفاً نام و ایمیل را وارد کنید');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-19150099/test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, name })
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success && data.emailResult?.success) {
        toast.success('ایمیل با موفقیت ارسال شد!');
      } else {
        toast.error('خطا در ارسال ایمیل: ' + (data.emailResult?.error || data.error));
      }
    } catch (error) {
      console.error('Test email error:', error);
      toast.error('خطا در تست ایمیل');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-4">تست ارسال ایمیل</h3>
      
      <div className="space-y-4">
        <Input
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
          dir="rtl"
        />
        
        <Input
          placeholder="ایمیل"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dir="ltr"
        />
        
        <Button 
          onClick={testEmail} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'در حال ارسال...' : 'تست ارسال ایمیل'}
        </Button>
      </div>

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm" dir="ltr">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </Card>
  );
}