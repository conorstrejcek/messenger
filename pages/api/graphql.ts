import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Message {
    id: ID!
    text: String!
    timestamp: String! # ISO date string
    senderId: ID!
    recipientId: ID!
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
    messages: [Message!]!
  }
`;

const mockMessages = [
  {
    id: "testId1",
    text: "Hello user 2!",
    timestamp: new Date("2023-09-09T12:00").toISOString(),
    senderId: 1,
    recipientId: 2,
  },
  {
    id: "testId2",
    text: "Hello user 1!",
    timestamp: new Date("2023-09-09T12:05").toISOString(),
    senderId: 2,
    recipientId: 1,
  },
];

export const resolvers = {
  Query: {
    messages: () => mockMessages,
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
