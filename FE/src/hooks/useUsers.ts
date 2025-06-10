import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../lib/graphqlClient";
import { gql } from "graphql-request";

const USERS_QUERY = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await graphqlClient.request(USERS_QUERY);
      return res.users;
    },
  });
};
