import { gql, useQuery } from "@apollo/client";

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      text
      timestamp
      senderId
    }
  }
`;

interface Message {
  id: string;
  text: string;
  timestamp: string;
  senderId: string;
}

function MessageBubble(props: {
  text: string;
  timestamp: string;
  isSender: boolean;
}) {
  const { text, timestamp, isSender } = props;
  return (
    <div className={`pb-2 mb-2 ${isSender ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block p-3 rounded-lg max-w-full ${
          isSender ? "bg-gray-200" : "bg-blue-200"
        }`}
        style={{ maxWidth: "calc(100% - 5rem)" }}
      >
        <p className="text-gray-800 text-md whitespace-pre-line break-words text-left">
          {text}
        </p>
      </div>
      <p className={`text-gray-600 text-xs mt-1 block`}>
        {new Date(timestamp).toLocaleString()}
      </p>
    </div>
  );
}

export function MessageList(props: { senderId: string }) {
  const { loading, error, data } = useQuery<{ messages: Message[] }>(
    GET_MESSAGES,
    { pollInterval: 500 },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const messages = data?.messages ?? [];

  return (
    <div className="bg-white p-4 rounded shadow flex-1 flex-col overflow-y-auto">
      {messages.length === 0 ? (
        <p className="text-gray-400 text-md text-center">No messages yet!</p>
      ) : null}
      {messages.map(({ id, text, timestamp, senderId }) => (
        <MessageBubble
          key={id}
          text={text}
          timestamp={timestamp}
          isSender={senderId === props.senderId}
        />
      ))}
    </div>
  );
}
