import { getUserFromRequest, getTrialDaysRemaining, isTrialExpired } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const user = await getUserFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Not logged in' })
  return res.status(200).json({
    user: {
      id: user.id, name: user.name, email: user.email, plan: user.plan,
      trialEndsAt: user.trial_ends_at,
      trialDaysRemaining: getTrialDaysRemaining(user),
      trialExpired: isTrialExpired(user),
      generationsUsed: user.generations_used,
    }
  })
}
