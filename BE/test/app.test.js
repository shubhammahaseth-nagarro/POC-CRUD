const request = require("supertest");
const app = require("../app");
const { resetData } = require("../schema");

beforeEach(() => resetData());

describe("GraphQL CRUD", () => {
  it("creates a user", async () => {
    const mutation = `
      mutation {
        createUser(name: "Alice", email: "alice@example.com") {
          id
          name
          email
        }
      }
    `;
    const res = await request(app).post("/graphql").send({ query: mutation });
    expect(res.body.data.createUser).toEqual({
      id: "1",
      name: "Alice",
      email: "alice@example.com",
    });
  });

  it("gets all users", async () => {
    await request(app).post("/graphql").send({
      query: `mutation { createUser(name: "Bob", email: "bob@example.com") { id } }`,
    });

    const query = `{ users { id name email } }`;
    const res = await request(app).post("/graphql").send({ query });
    expect(res.body.data.users.length).toBe(1);
  });

  it("gets a user by ID", async () => {
    await request(app).post("/graphql").send({
      query: `mutation { createUser(name: "Carl", email: "carl@example.com") { id } }`,
    });

    const res = await request(app).post("/graphql").send({
      query: `{ user(id: 1) { id name email } }`,
    });

    expect(res.body.data.user.name).toBe("Carl");
  });

  it("updates a user", async () => {
    await request(app).post("/graphql").send({
      query: `mutation { createUser(name: "Dan", email: "dan@example.com") { id } }`,
    });

    const mutation = `
      mutation {
        updateUser(id: "1", name: "Daniel") {
          id
          name
          email
        }
      }
    `;
    const res = await request(app).post("/graphql").send({ query: mutation });
    expect(res.body.data.updateUser.name).toBe("Daniel");
  });

  it("deletes a user", async () => {
    await request(app).post("/graphql").send({
      query: `mutation { createUser(name: "Eve", email: "eve@example.com") { id } }`,
    });

    const mutation = `
      mutation {
        deleteUser(id: "1") {
          id
          name
        }
      }
    `;
    const res = await request(app).post("/graphql").send({ query: mutation });
    expect(res.body.data.deleteUser.name).toBe("Eve");

    const res2 = await request(app).post("/graphql").send({
      query: `{ users { id } }`,
    });
    expect(res2.body.data.users.length).toBe(0);
  });

  it("throws error if updating non-existent user", async () => {
    const mutation = `
      mutation {
        updateUser(id: "99", name: "Ghost") {
          id
          name
        }
      }
    `;
    const res = await request(app).post("/graphql").send({ query: mutation });
    expect(res.body.errors[0].message).toMatch(/User not found/);
  });

  it("throws error if deleting non-existent user", async () => {
    const mutation = `
      mutation {
        deleteUser(id: "99") {
          id
        }
      }
    `;
    const res = await request(app).post("/graphql").send({ query: mutation });
    expect(res.body.errors[0].message).toMatch(/User not found/);
  });
});
