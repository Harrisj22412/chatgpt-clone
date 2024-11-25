/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-Ia7U2sWBBpy6LxaZjoiA3cDn",
  apiKey:
    "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",
});

const openai = new OpenAIApi(configuration);

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    setIsTyping(true);

    setChats(...chats, { role: "user", content: message });
    setMessage("");

    await openai
      .createChat({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are chatgpt. You help me with my questions.",
          },
          ...chats,
        ],
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main>
      <h1>ChatGPT </h1>

      {isTyping ? (
        <div>
          <p>
            <i>Typing</i>
          </p>
        </div>
      ) : (
        ""
      )}
      <form onSubmit={((e) => chat(e), message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a messsage and hit enter"
          onChange={(e) => setMessage(e.target.value)}
        ></input>
      </form>
    </main>
  );
}

export default App;
