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

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent adding a new line
      sendMessage();
    }
  };

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
      <div className="p-4 bg-white shadow-lg items-center">
        <div className="flex">
          <div className="flex-grow mr-2 relative">
            <textarea
              className="w-full border p-2 rounded text-gray-800"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="text-right text-xs text-gray-500 absolute right-0 bottom-0 -mb-3">
              Shift + Return to add a new line
            </div>
          </div>
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
