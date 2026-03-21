import crypto from 'crypto'
import { getUserFromRequest } from '../../../lib/auth'
import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const user = await getUserFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Please login' })

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body
  const body = razorpay_order_id + '|' + razorpay_payment_id
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex')

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ error: 'Payment verification failed' })
  }

  const periodEnd = new Date()
  periodEnd.setMonth(periodEnd.getMonth() + 1)

  await supabaseAdmin.from('subscriptions').insert({
    user_id: user.id, razorpay_payment_id, plan, status: 'active',
    amount: { starter: 499, pro: 999, agency: 2499 }[plan], currency: 'INR',
    current_period_start: new Date().toISOString(), current_period_end: periodEnd.toISOString(),
  })
  await supabaseAdmin.from('users').update({ plan, subscription_status: 'active', generations_used: 0 }).eq('id', user.id)

  return res.status(200).json({ success: true, plan })
}
