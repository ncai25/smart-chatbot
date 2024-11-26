"use client";
import Chatbot from "@/components/ChatBot";
import LoginButton from "@/components/LoginLogoutButton";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-muted flex flex-col items-center justify-center">
      {/* Login Button */}
      <div className="absolute top-2 right-2 p-4 z-50">
        <LoginButton />
      </div>

      {/* Chatbot */}
      <div className="fixed inset-0">
        <Chatbot />
      </div>
    </main>
  );
}
