import { useEffect } from "react";

export default function ThinkStackChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.thinkstack.ai/bot/thinkstackai-loader.min.js";
    script.async = true;
    script.setAttribute("chatbot_id", "68d64546b776d3979c31717e");
    script.setAttribute("data-type", "bar");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; 
}
