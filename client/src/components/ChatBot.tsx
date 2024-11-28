"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import ReactMarkdown from "react-markdown";

interface Message {
  role: string;
  content: string;
}
export default function Chatbot() {
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const initializeUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Authenticated user
        setUserId(user.id);
      } else {
        // Unauthenticated user
        const newUserId = crypto.randomUUID();
        setUserId(newUserId);
      }
    };
    initializeUser();
  }, []);
  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/process_message`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          message: input,
          userId: userId,
        }),
      }
    );

    const data = await res.json();
    const botResponse = data.response;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "bot", content: botResponse },
    ]);

    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  return (
    <main className="fixed h-full w-full  bg-muted">
      <div className="container h-full w-full max-w-2xl mx-auto flex flex-col py-8">
        <div className="flex-1 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex my-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 rounded-lg shadow-md max-w-xs break-words ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                <ReactMarkdown
                  components={{
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-5" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5" {...props} />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-auto relative"
        >
          <Textarea
            className="w-full text-lg"
            placeholder="Start typing..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 rounded-full"
          >
            <Send size={24} />
          </Button>
        </form>
      </div>
    </main>
  );
}
