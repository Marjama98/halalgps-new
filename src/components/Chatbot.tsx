"use client";

import { useState, useEffect } from "react";
import { FaRegCommentDots, FaTimes } from "react-icons/fa"; // Import FaTimes for the close button
import { useSpring } from "react-spring";
import { responses } from "@/data/responses";
import { Message } from "@/data/responses";

const getChatbotResponse = (input: string) => {
  const lowercasedInput = input.toLowerCase();
  const cleanedInput = lowercasedInput.replace(/[^\w\s]/g, ""); // Remove punctuation

  const response = responses[cleanedInput as keyof typeof responses];

  if (response) {
    return response;
  } else {
    return "I'm sorry, I didn't quite understand that. For more information, check out our FAQ section!";
  }
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Animation for the chat window
  const chatAnimation = useSpring({
    opacity: isChatOpen ? 1 : 0,
    transform: isChatOpen ? "translateY(0)" : "translateY(20px)",
    config: { tension: 300, friction: 20 },
  });

  // This will run when the chat is opened and send the initial greeting
  useEffect(() => {
    if (isChatOpen) {
      const timeout = setTimeout(() => {
        const greetingMessage: Message = {
          text: "Hi, how can I help you today?",
          sender: "bot",
          timestamp: Date.now(),
        };
        setMessages([greetingMessage]);
      }, 300); // Delay by 1 second
  
      return () => clearTimeout(timeout); // Cleanup in case chat is closed before timeout finishes
    }
  }, [isChatOpen]);


  const handleSendMessage = () => {
    if (userInput.trim() === "") return;
  
    const newMessages: Message[] = [
      ...messages,
      { text: userInput, sender: "user", timestamp: Date.now() }, // Add timestamp here
    ];
  
    setMessages(newMessages);
    setUserInput("");
  
    // Generate and append the bot response instantly
    const botResponse = getChatbotResponse(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, sender: "bot", timestamp: Date.now() }, // Add timestamp here as well
    ]);
  };
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-[#6d7f43] text-white p-2 cursor-pointer z-50 rounded-md"
      >
        <FaRegCommentDots className="text-2xl" />
      </div>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div
         // Apply chat window animation directly here
          className="fixed bottom-8 right-8 bg-white border-2 border-white shadow-lg w-80 p-4 z-50 rounded-md"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Chatbot</span>
            <FaTimes
              onClick={toggleChat} // Close the chat when clicked
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />
          </div>
          <div className="flex flex-col h-80 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`inline-block max-w-full break-words px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 border rounded-lg px-3 py-2 mr-2"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown} // Trigger on Enter press
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#6d7f43] text-white p-2"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
