import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages
  });
  return NextResponse.json(completion);
}
