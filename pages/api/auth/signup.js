import { supabaseAdmin } from '../../../lib/supabase'
import { hashPassword, createToken } from '../../../lib/auth'

async function sendWelcomeEmail(name, email, trialEndsAt) {
  const trialDate = new Date(trialEndsAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'WriteAI <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to WriteAI — Your 7-day free trial has started!',
        html: `<div style="max-width:560px;margin:40px auto;font-family:-apple-system,sans-serif;background:#fff;border-radius:12px;border:1px solid #eee;overflow:hidden"><div style="background:#185FA5;padding:28px 32px"><div style="font-size:22px;font-weight:600;color:#fff">WriteAI</div><div style="font-size:13px;color:#BFDBFE;margin-top:4px">AI Writing Suite</div></div><div style="padding:32px"><h1 style="font-size:22px;font-weight:600;color:#111;margin:0 0 8px">Welcome, ${name}!</h1><p style="font-size:15px;color:#555;line-height:1.6;margin:0 0 24px">Your 7-day free trial has started. You now have full access to all 12 AI writing tools!</p><div style="background:#EAF3DE;border-radius:10px;padding:20px;margin-bottom:24px"><div style="font-size:13px;font-weight:600;color:#27500A;margin-bottom:12px">Your trial includes:</div><div style="font-size:13px;color:#3B6D11;line-height:2">✓ All 12 writing tools unlocked<br>✓ Unlimited AI generations for 7 days<br>✓ 25 languages including Arabic and Hindi<br>✓ No credit card required</div><div style="font-size:12px;color:#3B6D11;margin-top:12px;padding-top:8px;border-top:1px solid #C0DD97">Trial ends: <strong>${trialDate}</strong></div></div><a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display:block;background:#185FA5;color:#fff;text-align:center;padding:14px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:20px">Open WriteAI and start writing</a><div style="background:#E6F1FB;border-radius:8px;padding:14px;font-size:12px;color:#0C447C"><strong>Tip:</strong> Upgrade before trial ends to save 30%!</div></div><div style="padding:20px 32px;border-top:1px solid #eee;font-size:11px;color:#999;text-align:center">WriteAI — AI Writing Suite</div></div>`,
      }),
    })
  } catch (error) {
    console.error('Email send failed:', error)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' })
  if (password.length < 8) return res.status(400).json({ error: 'Password must be 8+ characters' })

  const { data: existing } = await supabaseAdmin.from('users').select('id').eq('email', email.toLowerCase()).single()
  if (existing) return res.status(400).json({ error: 'Email already registered' })

  const passwordHash = await hashPassword(password)
  const trialEndsAt = new Date()
  trialEndsAt.setDate(trialEndsAt.getDate() + 7)

  const { data: user, error } = await supabaseAdmin.from('users').insert({
    name, email: email.toLowerCase(), password_hash: passwordHash,
    plan: 'trial', trial_ends_at: trialEndsAt.toISOString(),
  }).select().single()

  if (error) return res.status(500).json({ error: 'Could not create account' })

  await sendWelcomeEmail(name, email.toLowerCase(), trialEndsAt.toISOString())

  const token = createToken(user.id)
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${30*24*60*60}; SameSite=Lax${process.env.NODE_ENV==='production'?'; Secure':''}`)
  return res.status(201).json({ success: true, user: { id: user.id, name: user.name, email: user.email, plan: user.plan, trialEndsAt: user.trial_ends_at } })
}
