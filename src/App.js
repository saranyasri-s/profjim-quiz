import React, { useState } from "react";

const ChatComponent = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: "You assistant,please help me",
              },
              {
                role: "user",
                content: input,
              },
            ],
            model: "gpt-3.5-turbo",
          }),
        }
      );

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: data.choices[0].message.content,
        },
      ]);

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
