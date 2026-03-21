import { getUserFromRequest } from '../../lib/auth'
import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const user = await getUserFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Please login' })

  const { data: history } = await supabaseAdmin
    .from('generations')
    .select('id, tool, tone, output_text, word_count, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return res.status(200).json({ history: history || [] })
}
