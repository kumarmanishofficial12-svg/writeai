import { getUserFromRequest, getPlanLimits, isTrialExpired } from '../../lib/auth'
import { supabaseAdmin } from '../../lib/supabase'

const TOOL_SYSTEMS = {
  email: 'You are an expert cold email copywriter. Write compelling emails that get replies. Always include a subject line.',
  ads: 'You are a direct response advertising expert. Write high-converting ad copy with headline, body, and strong CTA.',
  proposal: 'You are a business consultant. Write a professional, structured business proposal that wins clients.',
  linkedin: 'You are a LinkedIn content strategist. Write engaging thought leadership posts that get likes and shares.',
  product: 'You are an ecommerce copywriter. Write persuasive product descriptions that convert visitors to buyers.',
  blog: 'You are an SEO content writer. Write well-structured, engaging blog content with clear headings.',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const user = await getUserFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Please login' })
  if (isTrialExpired(user)) return res.status(403).json({ error: 'trial_expired', message: 'Your 7-day trial has ended. Please choose a plan.' })

  const { tool, tone, input, language = 'English' } = req.body
  if (!tool || !input) return res.status(400).json({ error: 'Tool and input required' })

  const limits = getPlanLimits(user.plan)
  if (limits.generations !== Infinity && user.generations_used >= limits.generations) {
    return res.status(403).json({ error: 'limit_reached', message: `You have used all ${limits.generations} generations. Please upgrade.` })
  }

  const freeTools = ['email', 'ads']
  if (user.plan === 'starter' && !freeTools.includes(tool)) {
    return res.status(403).json({ error: 'tool_locked', message: 'This tool requires a Pro plan.' })
  }

  const systemPrompt = TOOL_SYSTEMS[tool] || TOOL_SYSTEMS.email
  const fullPrompt = `${systemPrompt} Tone: ${tone || 'Professional'}. IMPORTANT: Always respond in ${language} language. Be concise, impactful, and ready to use.\n\nUser request: ${input}`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
        }),
      }
    )
    const data = await response.json()
    if (!response.ok || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return res.status(500).json({ error: 'AI generation failed. Please try again.' })
    }
    const outputText = data.candidates[0].content.parts[0].text
    const wordCount = outputText.split(/\s+/).length

    await supabaseAdmin.from('generations').insert({
      user_id: user.id, tool, tone: tone || 'Professional',
      input_text: input.slice(0, 500), output_text: outputText, language, word_count: wordCount,
    })
    await supabaseAdmin.from('users').update({ generations_used: user.generations_used + 1 }).eq('id', user.id)

    return res.status(200).json({ success: true, output: outputText, wordCount })
  } catch (error) {
    return res.status(500).json({ error: 'AI generation failed. Please try again.' })
  }
}
