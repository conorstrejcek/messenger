import { useRouter } from "next/router";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

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
        className={`inline-block p-3 rounded-lg ${
          isSender ? "bg-gray-200" : "bg-blue-200"
        } ${isSender ? "ml-20" : "mr-20"}`}
      >
        <p className="text-gray-800 text-md">{text}</p>
      </div>
      <p className={`text-gray-600 text-xs mt-1 block`}>
        {new Date(timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}

function Messages(props: { senderId: string }) {
  const { loading, error, data } = useQuery<{ messages: Message[] }>(
    GET_MESSAGES,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const messages = data?.messages ?? [];

  return (
    <div className="max-w-lg mx-auto bg-white p-4 rounded shadow">
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

export default function Messenger() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>Loading...</p>;
  }

  if (typeof id !== "string") {
    return <p>URL must include a single user id (e.g. /user/1)</p>;
  }

  return (
    <ApolloProvider client={client}>
      <main className="p-4 bg-gray-100 h-screen">
        <Messages senderId={id} />
      </main>
    </ApolloProvider>
  );
}
