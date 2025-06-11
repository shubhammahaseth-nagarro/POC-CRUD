import { graphql } from "msw";

// In-memory mock database
let mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Doe", email: "jane@example.com" },
];

export const handlers = [
  // GET USERS
  graphql.query("GetUsers", (req, res, ctx) => {
    return res(
      ctx.data({
        users: mockUsers,
      })
    );
  }),

  // CREATE USER
  graphql.mutation("CreateUser", (req, res, ctx) => {
    const { name, email } = req.variables.input;
    const newUser = { id: (mockUsers.length + 1).toString(), name, email };
    mockUsers.push(newUser);
    return res(
      ctx.data({
        createUser: newUser,
      })
    );
  }),

  // UPDATE USER
  graphql.mutation("UpdateUser", (req, res, ctx) => {
    const { id, input } = req.variables;
    const userIndex = mockUsers.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res(ctx.errors([{ message: `User with id ${id} not found` }]));
    }
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...input };
    return res(
      ctx.data({
        updateUser: mockUsers[userIndex],
      })
    );
  }),

  // DELETE USER
  graphql.mutation("DeleteUser", (req, res, ctx) => {
    const { id } = req.variables;
    mockUsers = mockUsers.filter((user) => user.id !== id);
    return res(
      ctx.data({
        deleteUser: true,
      })
    );
  }),
];
