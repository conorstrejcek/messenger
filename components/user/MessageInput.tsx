import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $senderId: ID!) {
    sendMessage(text: $text, senderId: $senderId)
  }
`;

export function MessageInput(props: { senderId: string }) {
  const { senderId } = props;
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) {
      return;
    }
    try {
      await sendMessageMutation({
        variables: {
          text,
          senderId,
        },
      });
      setText("");
    } catch (error) {
      console.error("There was an error sending the message:", error);
    }
  };

  return (
    <div className="mt-4">
      <div className="left-0 right-0 p-4 bg-white shadow-lg flex items-center mx-auto">
        <textarea
          className="flex-grow border p-2 rounded mr-2 text-gray-800"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
