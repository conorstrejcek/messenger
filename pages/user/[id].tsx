import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { MessageList } from "../../components/user/MessageList";
import { MessageInput } from "../../components/user/MessageInput";

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      name
    }
  }
`;

interface User {
  name: string;
}

export default function Messenger() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<{ user: User }>(GET_USER_BY_ID, {
    variables: { id },
    skip: !id || typeof id !== "string",
  });

  if (!id || loading) {
    return <p>Loading...</p>;
  }
  if (error) return <p>Error: {error.message}</p>;

  if (typeof id !== "string") {
    return <p>URL must include a single user id (e.g. /user/1)</p>;
  }

  return (
    <main className="p-4 bg-gray-100 h-screen flex flex-col">
      <h1 className="text-gray-800 text-2xl font-semibold text-center mb-4">
        Sending as {data?.user.name}
      </h1>
      <MessageList senderId={id} />
      <MessageInput senderId={id} />
    </main>
  );
}
