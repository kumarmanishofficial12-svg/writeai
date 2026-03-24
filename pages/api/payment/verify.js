import crypto from 'crypto'
import { getUserFromRequest } from '../../../lib/auth'
import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const user = await getUserFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Please login' })

  const { txnid, amount, productinfo, firstname, email, status, hash, plan } = req.body
  const salt = process.env.PAYU_MERCHANT_SALT

  const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${process.env.PAYU_MERCHANT_KEY}`
  const expectedHash = crypto.createHash('sha512').update(hashString).digest('hex')

  if (expectedHash !== hash) {
    return res.status(400).json({ error: 'Payment verification failed' })
  }

  if (status !== 'success') {
    return res.status(400).json({ error: 'Payment was not successful' })
  }

  const periodEnd = new Date()
  periodEnd.setMonth(periodEnd.getMonth() + 1)

  await supabaseAdmin.from('subscriptions').insert({
    user_id: user.id, razorpay_payment_id: txnid, plan, status: 'active',
    amount: { starter: 499, pro: 999, agency: 2499 }[plan], currency: 'INR',
    current_period_start: new Date().toISOString(), current_period_end: periodEnd.toISOString(),
  })
  await supabaseAdmin.from('users').update({ plan, subscription_status: 'active', generations_used: 0 }).eq('id', user.id)

  return res.status(200).json({ success: true, plan })
}
