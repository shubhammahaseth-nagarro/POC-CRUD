import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../lib/graphqlClient";
import { gql } from "graphql-request";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name, email }) => {
      return await graphqlClient.request(UPDATE_USER_MUTATION, {
        id,
        name,
        email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error("Update failed:", err);
    },
  });
}
