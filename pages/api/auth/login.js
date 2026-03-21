import { supabaseAdmin } from '../../../lib/supabase'
import { verifyPassword, createToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  const { data: user } = await supabaseAdmin.from('users').select('*').eq('email', email.toLowerCase()).single()
  if (!user) return res.status(401).json({ error: 'Invalid email or password' })

  const isValid = await verifyPassword(password, user.password_hash)
  if (!isValid) return res.status(401).json({ error: 'Invalid email or password' })

  const token = createToken(user.id)
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${30*24*60*60}; SameSite=Lax${process.env.NODE_ENV==='production'?'; Secure':''}`)
  return res.status(200).json({ success: true, user: { id: user.id, name: user.name, email: user.email, plan: user.plan, trialEndsAt: user.trial_ends_at, generationsUsed: user.generations_used } })
}
