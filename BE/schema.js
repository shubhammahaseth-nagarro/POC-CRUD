const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");

let users = [];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: GraphQLList(UserType),
      resolve: () => users,
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: (_, args) => users.find((u) => u.id == args.id),
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { name, email }) => {
        const newUser = { id: String(users.length + 1), name, email };
        users.push(newUser);
        return newUser;
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: (_, { id, name, email }) => {
        const user = users.find((u) => u.id == id);
        if (!user) throw new Error("User not found");
        if (name) user.name = name;
        if (email) user.email = email;
        return user;
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => {
        const index = users.findIndex((u) => u.id == id);
        if (index === -1) throw new Error("User not found");
        return users.splice(index, 1)[0];
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

const resetData = () => {
  users = [{ id: 1, name: "John Doe", email: "john@example.com" }];
};

module.exports = { schema, resetData };
