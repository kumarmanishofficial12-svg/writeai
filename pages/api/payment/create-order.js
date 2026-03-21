import Razorpay from 'razorpay'
import { getUserFromRequest } from '../../../lib/auth'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const PLAN_AMOUNTS = { starter: 49900, pro: 99900, agency: 249900 }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const user = await getUserFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Please login' })

  const { plan } = req.body
  if (!PLAN_AMOUNTS[plan]) return res.status(400).json({ error: 'Invalid plan' })

  try {
    const order = await razorpay.orders.create({
      amount: PLAN_AMOUNTS[plan], currency: 'INR',
      receipt: `writeai_${user.id}_${Date.now()}`,
      notes: { userId: user.id, plan, userEmail: user.email }
    })
    return res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, userName: user.name, userEmail: user.email })
  } catch (error) {
    return res.status(500).json({ error: 'Could not create payment order' })
  }
}
