import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that provides FHA quotes.' },
      { role: 'user', content: message },
    ],
    stream: false,
  });
  return new Response(response.choices[0].message?.content || 'Sorry, no response');
}
