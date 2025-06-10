import { setupServer } from "msw/node";
import { graphql } from "msw";

export const server = setupServer(
  // Mock the users query
  graphql.query("Users", (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          { id: "1", name: "John Doe", email: "john@example.com" },
          { id: "2", name: "Jane Smith", email: "jane@example.com" },
        ],
      })
    );
  }),
  // Mock the createUser mutation
  graphql.mutation("CreateUser", (req, res, ctx) => {
    const { name, email } = req.variables;
    return res(
      ctx.data({
        createUser: { id: "3", name, email },
      })
    );
  }),
  // Mock the deleteUser mutation
  graphql.mutation("DeleteUser", (req, res, ctx) => {
    return res(
      ctx.data({
        deleteUser: { id: req.variables.id },
      })
    );
  }),
  // Mock the updateUser mutation
  graphql.mutation("UpdateUser", (req, res, ctx) => {
    const { id, name, email } = req.variables;
    return res(
      ctx.data({
        updateUser: { id, name, email },
      })
    );
  })
);
