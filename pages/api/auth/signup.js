import { supabaseAdmin } from '../../../lib/supabase'
import { hashPassword, createToken } from '../../../lib/auth'

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

  const token = createToken(user.id)
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${30*24*60*60}; SameSite=Lax${process.env.NODE_ENV==='production'?'; Secure':''}`)
  return res.status(201).json({ success: true, user: { id: user.id, name: user.name, email: user.email, plan: user.plan, trialEndsAt: user.trial_ends_at } })
}
