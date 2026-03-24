import crypto from 'crypto'
import { getUserFromRequest } from '../../../lib/auth'

const PLAN_AMOUNTS = { starter: 4999, pro: 8999, agency: 12999 }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const user = await getUserFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Please login' })

  const { plan } = req.body
  if (!PLAN_AMOUNTS[plan]) return res.status(400).json({ error: 'Invalid plan' })

  const txnid = `writeai_${user.id.slice(0,8)}_${Date.now()}`
  const amount = PLAN_AMOUNTS[plan]
  const productinfo = `WriteAI ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`
  const firstname = user.name.split(' ')[0]
  const email = user.email
  const key = process.env.PAYU_MERCHANT_KEY
  const salt = process.env.PAYU_MERCHANT_SALT

  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`
  const hash = crypto.createHash('sha512').update(hashString).digest('hex')

  return res.status(200).json({
    key, txnid, amount: amount.toString(), productinfo, firstname, email, hash,
    surl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/payu-success`,
    furl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/payu-failure`,
    plan,
  })
}
