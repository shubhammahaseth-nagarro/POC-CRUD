// const express = require("express");
// const { graphqlHTTP } = require("express-graphql");
// const {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLInt,
//   GraphQLID,
// } = require("graphql");

// // In-memory data store
// let users = [{ id: 1, name: "John Doe", email: "john@example.com" }];

// // GraphQL User Type
// const UserType = new GraphQLObjectType({
//   name: "User",
//   description: "A single user",
//   fields: () => ({
//     id: { type: GraphQLNonNull(GraphQLID) },
//     name: { type: GraphQLNonNull(GraphQLString) },
//     email: { type: GraphQLNonNull(GraphQLString) },
//   }),
// });

// // Root Query
// const RootQuery = new GraphQLObjectType({
//   name: "Query",
//   description: "Root Query",
//   fields: () => ({
//     users: {
//       type: GraphQLList(UserType),
//       description: "List of Users",
//       resolve: () => users,
//     },
//     user: {
//       type: UserType,
//       args: { id: { type: GraphQLNonNull(GraphQLID) } },
//       resolve: (parent, args) => users.find((u) => u.id == args.id),
//     },
//   }),
// });

// // Root Mutation
// const RootMutation = new GraphQLObjectType({
//   name: "Mutation",
//   description: "Root Mutation",
//   fields: () => ({
//     createUser: {
//       type: UserType,
//       args: {
//         name: { type: GraphQLNonNull(GraphQLString) },
//         email: { type: GraphQLNonNull(GraphQLString) },
//       },
//       resolve: (parent, args) => {
//         const newUser = {
//           id: users.length + 1,
//           name: args.name,
//           email: args.email,
//         };
//         users.push(newUser);
//         return newUser;
//       },
//     },
//     updateUser: {
//       type: UserType,
//       args: {
//         id: { type: GraphQLNonNull(GraphQLID) },
//         name: { type: GraphQLString },
//         email: { type: GraphQLString },
//       },
//       resolve: (parent, args) => {
//         const user = users.find((u) => u.id == args.id);
//         if (!user) throw new Error("User not found");
//         if (args.name) user.name = args.name;
//         if (args.email) user.email = args.email;
//         return user;
//       },
//     },
//     deleteUser: {
//       type: UserType,
//       args: { id: { type: GraphQLNonNull(GraphQLID) } },
//       resolve: (parent, args) => {
//         const index = users.findIndex((u) => u.id == args.id);
//         if (index === -1) throw new Error("User not found");
//         const deleted = users.splice(index, 1);
//         return deleted[0];
//       },
//     },
//   }),
// });

// // Schema
// const schema = new GraphQLSchema({
//   query: RootQuery,
//   mutation: RootMutation,
// });

// // Server
// const app = express();
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   })
// );

// app.listen(4000, () => {
//   console.log("Server running at http://localhost:4000/graphql");
// });

const app = require("./app");
const { resetData } = require("./schema");

resetData();

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000/graphql");
});
