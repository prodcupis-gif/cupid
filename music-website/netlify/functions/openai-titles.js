// Netlify Function: Generate AI beat titles via OpenAI
// POST -> /.netlify/functions/openai-titles
// Body: { genre?: string, bpm?: number|string, description?: string }

export async function handler(event) {
    try {
        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        const { genre, bpm, description } = JSON.parse(event.body || '{}');
        const apiKey = process.env.OPENAI_API_KEY;
        const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

        if (!apiKey) {
            return { statusCode: 500, body: 'Missing OPENAI_API_KEY' };
        }

        const prompt = createTitlePrompt(genre, bpm, description);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a creative music producer and beat maker. Generate catchy, professional beat titles that would appeal to artists and music buyers. Focus on titles that are memorable, marketable, and genre-appropriate.'
                    },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150,
                temperature: 0.8
            })
        });

        if (!response.ok) {
            return { statusCode: response.status, body: `OpenAI error: ${await response.text()}` };
        }

        const data = await response.json();
        const list = data.choices?.[0]?.message?.content
            ?.split('\n')
            .map((line) => line.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim())
            .filter((t) => t && t.length < 50)
            .slice(0, 8) || [];

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titles: list })
        };
    } catch (err) {
        return { statusCode: 500, body: `Server error: ${err.message}` };
    }
}

function createTitlePrompt(genre, bpm, description) {
    let prompt = `Generate 8 creative beat titles for a ${genre || 'music'} instrumental`;
    if (bpm) prompt += ` with ${bpm} BPM`;
    if (description) prompt += `. Description: "${description}"`;
    prompt += `.
Requirements:
- Make titles catchy and marketable
- Use genre-appropriate terminology
- Keep titles under 30 characters
- Include emotional or atmospheric elements
- Make them appealing to artists and music buyers
- Format as a simple list, one title per line
- Don't include numbers or bullet points`;
    return prompt;
}


