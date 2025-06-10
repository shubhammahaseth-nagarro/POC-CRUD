// hooks/useCreateUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../lib/graphqlClient";
import { gql } from "graphql-request";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) =>
      graphqlClient.request(CREATE_USER_MUTATION, { name, email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
