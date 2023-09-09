import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const USERS_QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`;

interface User {
  id: string;
  name: string;
}

export default function SelectUser() {
  const { data, loading, error } = useQuery<{ users: User[] }>(USERS_QUERY);
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.users ?? [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-gray-800 text-2xl mb-4">Select a User</h1>
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => router.push(`/user/${user.id}`)}
          className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {user.name}
        </button>
      ))}
    </div>
  );
}
