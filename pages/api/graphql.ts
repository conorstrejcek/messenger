import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import prisma from "../../lib/db";

export const typeDefs = gql`
  type Message {
    id: ID!
    text: String!
    timestamp: String! # ISO date string
    senderId: ID!
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
    messages: [Message!]!
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    sendMessage(text: String!, senderId: ID!): Boolean!
  }

  type Subscription {
    messageAdded: Message!
  }
`;

export const resolvers = {
  Query: {
    messages: async () => {
      const messages = await prisma.message.findMany();
      return messages;
    },
    users: async () => {
      const users = await prisma.user.findMany();
      return users;
    },
    user: async (_: any, args: { id: string }) => {
      const { id } = args;
      const user = await prisma.user.findFirst({ where: { id } });
      return user;
    },
  },
  Mutation: {
    sendMessage: async (
      parent: any,
      args: { text: string; senderId: string }
    ) => {
      await prisma.message.create({ data: args });
      return true;
    },
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
