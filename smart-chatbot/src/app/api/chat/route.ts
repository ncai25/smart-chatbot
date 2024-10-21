import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText } from "ai";


// handle POST request from the chatbot
export async function POST(req: Request) {
  const { messages } = await req.json();
  // send the messages to openai and stream the response
  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    // system: "Respond in emojies",
    messages,
  });
  return new StreamingTextResponse(result.toAIStream());
  // return the streaming text response to the front-end
}

