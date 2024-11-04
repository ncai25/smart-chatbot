"use client";
import { Textarea } from "@/components/ui/textarea";
// import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
// import Message from "./components/Messages";
import { useRef, useState } from "react";

interface Message {
  role: string;
  content: string;
}

export default function Home() {
  // const { messages, handleSubmit, input, handleInputChange } = useChat();
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(""); 

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);

    const res = await fetch("http://localhost:8080/api/process_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input}),
    });

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
                <p>{message.content}</p>
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
      {/* <div className="container h-full w-full max-w-2xl mx-auto flex flex-col py-8">
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
            // <div key={message.id} className="flex items-center">
            //   <div className="w-8 h-8 bg-primary rounded-full mr-4"></div>
            //   <div className="bg-white p-4 rounded-lg">
            //     <p className="text-lg">{message.content}</p>
            //   </div>
            // </div>*/}
    </main>
  );
}
