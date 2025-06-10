// hooks/useDeleteUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../lib/graphqlClient";
import { gql } from "graphql-request";

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await graphqlClient.request(DELETE_USER_MUTATION, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error("Delete failed:", err);
    },
  });
};
