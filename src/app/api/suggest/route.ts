import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { query } = await req.json();
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an AI assistant for Neel Somani's portfolio. Neel is a Web & AI Engineer specializing in Next.js, AI automation, and clean UI. Answer questions about his skills briefly and professionally." },
      { role: "user", content: `Tell me about Neel's experience with: ${query}` }
    ],
    max_tokens: 150,
  });

  return NextResponse.json({ result: response.choices[0].message.content });
}
