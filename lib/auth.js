import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from './supabase'

export async function hashPassword(password) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

export function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

export async function getUserFromRequest(req) {
  const token = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', '')
  if (!token) return null
  const decoded = verifyToken(token)
  if (!decoded) return null
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', decoded.userId)
    .single()
  return user
}

export function getPlanLimits(plan) {
  const limits = {
    trial: { generations: 100, tools: 6 },
    starter: { generations: 50, tools: 2 },
    pro: { generations: Infinity, tools: 6 },
    agency: { generations: Infinity, tools: 6 },
  }
  return limits[plan] || limits.trial
}

export function isTrialExpired(user) {
  if (user.plan !== 'trial') return false
  return new Date() > new Date(user.trial_ends_at)
}

export function getTrialDaysRemaining(user) {
  if (user.plan !== 'trial') return null
  const diff = new Date(user.trial_ends_at) - new Date()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}
