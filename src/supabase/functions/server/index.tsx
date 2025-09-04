import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createClient } from '@supabase/supabase-js'
import * as kv from './kv_store.tsx'

type Registration = {
  name: string;
  email: string;
  country?: string;
  registeredAt: string;
}

const app = new Hono()

// CORS middleware - must be before other middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('*', logger(console.log))

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Email sending function
async function sendThankYouEmail(name: string, email: string) {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      console.log('Warning: RESEND_API_KEY not found, using mock email')
      return { success: true, mock: true, message: 'Email simulation successful' }
    }

    // Validate API key format
    if (!resendApiKey.startsWith('re_')) {
      console.log('Warning: Invalid API key format, using mock email')
      return { success: true, mock: true, message: 'Email simulation successful (invalid key format)' }
    }

    // Attempting to send email to all addresses now that domain is configured
    console.log(`Attempting to send email to: ${email}`)

    // Use environment variable for from address, fallback to configured domain
    const fromAddress = Deno.env.get('EMAIL_FROM_ADDRESS') || 'Workshop Team <info@meysamzarei.com>'
    
    const emailContent = {
      from: fromAddress,
      to: [email],
      subject: '🎉 ثبت‌نام شما در ورکشاپ رایگان وب‌سازی تأیید شد!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>تشکر از ثبت‌نام</title>
          <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght;400;500;600;700;800;900&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 20px; font-family: 'Vazirmatn', 'Tahoma', Arial, sans-serif; line-height: 1.6; color: #333; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; direction: rtl; text-align: right;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); direction: rtl; border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; padding: 40px 30px; text-align: center; direction: rtl; position: relative; overflow: hidden;">
              <h1 style="margin: 0; font-size: 24px; direction: rtl; text-align: center; position: relative; z-index: 2;">🎉 خوش آمدید!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; direction: rtl; text-align: center; position: relative; z-index: 2;">ثبت‌نام شما با موفقیت انجام شد</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 35px; direction: rtl; text-align: right; background: white; position: relative;">
              <h2 style="color: #1e293b; direction: rtl; text-align: right; margin-top: 0;">سلام ${name}!</h2>
              
              <p style="direction: rtl; text-align: right; margin-bottom: 20px;">از اینکه برای شرکت در ورکشاپ رایگان <strong>"اولین قدمت رو برای ورود به دنیای وب بردار"</strong> ثبت‌نام کردید بسیار خوشحالیم! 🚀</p>
              
              <!-- Workshop Details Box -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-right: 4px solid #0ea5e9; padding: 20px; margin: 25px 0; border-radius: 12px; direction: rtl; box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);">
                <h3 style="margin-top: 0; color: #0ea5e9; direction: rtl; text-align: right;">📅 جزئیات ورکشاپ:</h3>
                <ul style="margin: 0; direction: rtl; text-align: right; padding-right: 20px; padding-left: 0;">
                  <li style="direction: rtl; text-align: right; margin: 8px 0;"><strong>تاریخ:</strong> یکشنبه ۲۱ سپتامبر ۲۰۲۵</li>
                  <li style="direction: rtl; text-align: right; margin: 8px 0;"><strong>ساعت:</strong> ۱۹:۰۰ الی ۲۱:۰۰</li>
                  <li style="direction: rtl; text-align: right; margin: 8px 0;"><strong>مدت:</strong> ۲ ساعت</li>
                  <li style="direction: rtl; text-align: right; margin: 8px 0;"><strong>نحوه برگزاری:</strong> آنلاین در گوگل میت</li>
                </ul>
              </div>
              
              <h3 style="color: #1e293b; direction: rtl; text-align: right;">📋 مراحل بعدی:</h3>
              <ol style="direction: rtl; text-align: right; padding-right: 20px; padding-left: 0;">
                <li style="direction: rtl; text-align: right; margin: 8px 0;">لینک ورکشاپ <strong>۲۴ ساعت قبل از شروع</strong> برای شما ارسال خواهد شد</li>
                <li style="direction: rtl; text-align: right; margin: 8px 0;">حتماً ایمیل‌تان را چک کنید (پوشه اسپم را هم بررسی کنید)</li>
                <li style="direction: rtl; text-align: right; margin: 8px 0;">برای شرکت، فقط به یک مرورگر و اتصال اینترنت نیاز دارید</li>
              </ol>
              
              <!-- Important Note -->
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); border: 1px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 25px 0; direction: rtl; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);">
                <p style="margin: 0; color: #92400e; direction: rtl; text-align: right;"><strong>💡 نکته مهم:</strong> لطفاً این ایمیل را نگه دارید تا در صورت نیاز بتوانید به جزئیات ورکشاپ مراجعه کنید.</p>
              </div>
              
              <h3 style="color: #1e293b; direction: rtl; text-align: right;">🎯 چه چیزی یاد خواهید گرفت:</h3>
              <ul style="direction: rtl; text-align: right; padding-right: 20px; padding-left: 0;">
                <li style="direction: rtl; text-align: right; margin: 8px 0;">مفاهیم پایه وب‌سازی (HTML, CSS, JavaScript)</li>
                <li style="direction: rtl; text-align: right; margin: 8px 0;">ساخت اولین پروژه عملی</li>
                <li style="direction: rtl; text-align: right; margin: 8px 0;">آشنایی با ابزارهای مدرن توسعه</li>
                <li style="direction: rtl; text-align: right; margin: 8px 0;">راهنمایی برای ادامه مسیر یادگیری</li>
              </ul>
              
              <p style="direction: rtl; text-align: right;">اگر سوال یا نگرانی خاصی دارید، می‌توانید پاسخ این ایمیل را بدهید.</p>
              
              <p style="direction: rtl; text-align: right;">منتظر حضور شما در ورکشاپ هستیم! 🌟</p>
              
              <p style="margin-top: 30px; text-align: center; direction: rtl;">
                با تشکر،<br>
                <strong>میثم زارعی</strong><br>
                مدرس ورکشاپ وب‌سازی
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 30px 20px; text-align: center; font-size: 14px; color: #64748b; direction: rtl; border-top: 1px solid rgba(0, 0, 0, 0.05);">
              <p style="direction: rtl; text-align: center; margin: 5px 0;">این ایمیل به دلیل ثبت‌نام شما در ورکشاپ رایگان وب‌سازی ارسال شده است.</p>
              <p style="direction: rtl; text-align: center; margin: 5px 0;">© ۲۰۲۵ ورکشاپ وب‌سازی. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    console.log('Sending email with content:', {
      from: emailContent.from,
      to: emailContent.to,
      subject: emailContent.subject,
      apiKeyLength: resendApiKey.length,
      apiKeyPrefix: resendApiKey.substring(0, 3)
    })

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailContent),
    })

    console.log('Resend API response status:', response.status)
    console.log('Resend API response headers:', Object.fromEntries(response.headers.entries()))

    const result = await response.json()
    console.log('Resend API response body:', result)

    if (!response.ok) {
      console.log('Email sending failed with status:', response.status)
      console.log('Error details:', result)
      
      // Check if it's a domain verification issue
      if (result.message && (result.message.includes('verify a domain') || result.message.includes('testing emails'))) {
        console.log('Domain not verified or testing mode limitation, using mock email fallback')
        return { 
          success: true, 
          mock: true, 
          message: 'Email simulation successful (need to verify domain for production emails)',
          reason: 'domain_not_verified'
        }
      }
      
      // Fall back to mock email if API fails
      if (result.statusCode === 401 || result.name === 'validation_error') {
        console.log('API key invalid, using mock email')
        return { success: true, mock: true, message: 'Email simulation successful (API key invalid)' }
      }
      return { success: false, error: result.message || result.error || `HTTP ${response.status}: ${JSON.stringify(result)}` }
    }

    console.log('Thank you email sent successfully to:', email)
    return { success: true, emailId: result.id }

  } catch (error) {
    console.log('Email sending error during thank you email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

// Register for workshop
app.post('/make-server-19150099/register', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, country } = body

    // Validate required fields
    if (!name || !email) {
      console.log('Registration error: Missing required fields')
      return c.json({ 
        success: false, 
        error: 'نام و ایمیل الزامی است' 
      }, 400)
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Registration error: Invalid email format')
      return c.json({ 
        success: false, 
        error: 'فرمت ایمیل صحیح نیست' 
      }, 400)
    }

    // Check if email already exists
    const existingRegistration = await kv.get(`registration_${email}`)
    if (existingRegistration) {
      console.log(`Registration attempt with existing email: ${email}`)
      return c.json({ 
        success: false, 
        error: 'این ایمیل قبلاً ثبت‌نام کرده است',
        errorType: 'DUPLICATE_EMAIL'
      }, 409)
    }

    // Create registration data
    const registration: Registration = {
      name,
      email,
      country: country || 'نامشخص',
      registeredAt: new Date().toISOString()
    }

    // Save to KV store
    await kv.set(`registration_${email}`, registration)

    // Also add to list of all registrations
    const allRegistrations = await kv.get('all_registrations') || []
    allRegistrations.push(registration)
    await kv.set('all_registrations', allRegistrations)

    console.log(`Successfully registered user: ${name} (${email})`)

    // Send thank you email
    const emailResult = await sendThankYouEmail(name, email)
    if (!emailResult.success) {
      console.log(`Email sending failed for ${email}:`, emailResult.error)
      // Don't fail the registration if email fails, just log it
    }
    
    let message = 'ثبت‌نام شما با موفقیت انجام شد!'
    if (emailResult.mock) {
      if (emailResult.reason === 'domain_not_verified') {
        message += ' (ایمیل تشکر شبیه‌سازی شد - لطفاً domain خود را در Resend تأیید کنید)'
      } else {
        message += ' (ایمیل تشکر شبیه‌سازی شد - بررسی تنظیمات Resend مورد نیاز است)'
      }
    } else if (emailResult.success) {
      message += ' ایمیل تشکر با موفقیت ارسال شد!'
    } else {
      message += ' (خطا در ارسال ایمیل - ثبت‌نام شما ثبت شده است)'
    }
    
    return c.json({ 
      success: true, 
      message: message,
      emailSent: emailResult.success,
      emailMocked: emailResult.mock || false
    })

  } catch (error) {
    console.log('Registration error during workshop registration:', error)
    return c.json({ 
      success: false, 
      error: 'خطایی در سرور رخ داده است. لطفاً دوباره تلاش کنید.' 
    }, 500)
  }
})

// Get registration statistics
app.get('/make-server-19150099/stats', async (c) => {
  try {
    const allRegistrations = await kv.get('all_registrations') || []
    
    return c.json({ 
      success: true, 
      stats: {
        totalRegistrations: allRegistrations.length,
        countries: [...new Set(allRegistrations.map((reg: Registration) => reg.country))]
      }
    })

  } catch (error) {
    console.log('Stats error during getting registration stats:', error)
    return c.json({ 
      success: false, 
      error: 'خطا در دریافت آمار' 
    }, 500)
  }
})

// Check if email is already registered
app.get('/make-server-19150099/check-email/:email', async (c) => {
  try {
    const email = c.req.param('email')
    const existingRegistration = await kv.get(`registration_${email}`)
    
    return c.json({ 
      success: true, 
      exists: !!existingRegistration 
    })

  } catch (error) {
    console.log('Email check error during checking email:', error)
    return c.json({ 
      success: false, 
      error: 'خطا در بررسی ایمیل' 
    }, 500)
  }
})



// Test email endpoint for debugging
app.post('/make-server-19150099/test-email-direct', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email } = body
    
    console.log(`Direct email test requested for: ${email}`)
    
    if (!name || !email) {
      return c.json({ 
        success: false, 
        error: 'نام و ایمیل الزامی است' 
      }, 400)
    }

    // Check API key
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      return c.json({ 
        success: false, 
        error: 'API key پیدا نشد',
        debug: {
          hasApiKey: false
        }
      }, 500)
    }

    // Simple test email - use environment variable or fallback
    const fromAddress = Deno.env.get('EMAIL_FROM_ADDRESS') || 'Test <info@meysamzarei.com>'
    
    const testEmailContent = {
      from: fromAddress,
      to: [email],
      subject: 'تست ایمیل - ' + new Date().toLocaleString('fa-IR'),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght;400;500;600;700;800;900&display=swap" rel="stylesheet">
        </head>
        <body style="font-family: 'Vazirmatn', 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; line-height: 1.6; color: #333; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; margin: 0;">
          <div style="max-width: 500px; margin: 40px auto; background: white; padding: 30px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); direction: rtl;">
            <h2 style="direction: rtl; text-align: right; color: #1e293b; margin-top: 0;">سلام ${name}!</h2>
            <p style="direction: rtl; text-align: right;">این یک ایمیل تست است که در ${new Date().toLocaleString('fa-IR')} ارسال شده.</p>
            <p style="direction: rtl; text-align: right;">اگر این ایمیل را دریافت کردید، یعنی سیستم کار می‌کند!</p>
          </div>
        </body>
        </html>
      `
    }

    console.log('Sending test email...')
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEmailContent),
    })

    const result = await response.json()
    
    console.log(`Email API response status: ${response.status}`)
    console.log('Email API response:', result)

    return c.json({
      success: response.ok,
      status: response.status,
      result: result,
      debug: {
        hasApiKey: true,
        apiKeyLength: resendApiKey.length,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.log('Direct email test error:', error)
    return c.json({ 
      success: false, 
      error: error.message || 'خطا در تست ایمیل',
      stack: error.stack
    }, 500)
  }
})

// Debug endpoint to check API key and environment
app.get('/make-server-19150099/debug-resend', async (c) => {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const emailFromAddress = Deno.env.get('EMAIL_FROM_ADDRESS')
    
    if (!resendApiKey) {
      return c.json({
        success: false,
        error: 'RESEND_API_KEY not found',
        debug: {
          hasApiKey: false,
          hasFromAddress: !!emailFromAddress,
          fromAddress: emailFromAddress || 'NOT_SET',
          timestamp: new Date().toISOString()
        }
      })
    }

    // Test a simple API call to Resend to check key validity and get domains
    const testResponse = await fetch('https://api.resend.com/domains', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
    })

    const testResult = await testResponse.json()

    // Also test sending capability with a simple verification
    let sendingTestResult = null
    try {
      const sendingTestResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: emailFromAddress || 'onboarding@resend.dev',
          to: ['test@example.com'], // This will fail but show us the error
          subject: 'Test',
          html: 'Test'
        }),
      })
      sendingTestResult = {
        status: sendingTestResponse.status,
        response: await sendingTestResponse.json()
      }
    } catch (e) {
      sendingTestResult = { error: e.message }
    }

    return c.json({
      success: testResponse.ok,
      status: testResponse.status,
      apiKeyValid: testResponse.ok,
      debug: {
        hasApiKey: true,
        hasFromAddress: !!emailFromAddress,
        fromAddress: emailFromAddress || 'NOT_SET (using default)',
        apiKeyLength: resendApiKey.length,
        apiKeyPrefix: resendApiKey.substring(0, 3),
        apiKeySuffix: resendApiKey.substring(resendApiKey.length - 3),
        domainsResponse: testResult,
        sendingTest: sendingTestResult,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Debug Resend error:', error)
    return c.json({
      success: false,
      error: error.message,
      debug: {
        timestamp: new Date().toISOString()
      }
    }, 500)
  }
})

// Simple test email endpoint
app.post('/make-server-19150099/test-email', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email } = body
    
    console.log(`Test email requested for: ${name} <${email}>`)
    
    if (!name || !email) {
      return c.json({ 
        success: false, 
        error: 'نام و ایمیل الزامی است' 
      }, 400)
    }

    // Use the same email function
    const emailResult = await sendThankYouEmail(name, email)
    
    return c.json({
      success: emailResult.success,
      mock: emailResult.mock || false,
      message: emailResult.message || (emailResult.success ? 'ایمیل ارسال شد' : 'خطا در ارسال ایمیل'),
      error: emailResult.error,
      emailId: emailResult.emailId,
      debug: {
        timestamp: new Date().toISOString(),
        hasApiKey: !!Deno.env.get('RESEND_API_KEY')
      }
    })

  } catch (error) {
    console.error('Test email endpoint error:', error)
    return c.json({ 
      success: false, 
      error: `خطا در سرور: ${error.message}`,
      debug: {
        timestamp: new Date().toISOString(),
        errorType: error.name
      }
    }, 500)
  }
})

// Health check
app.get('/make-server-19150099/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

Deno.serve(app.fetch)