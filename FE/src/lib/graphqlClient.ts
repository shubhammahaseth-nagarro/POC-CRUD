// lib/graphqlClient.ts
import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient("http://localhost:4000/graphql");
