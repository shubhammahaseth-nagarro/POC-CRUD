import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { useCreateUser } from "./hooks/useCreateUser";
import { useDeleteUser } from "./hooks/useDeleteUser";
import { useUpdateUser } from "./hooks/useUpdateUser";

function App() {
  const { data: users, isLoading, isError, error } = useUsers();
  const { mutate: createUser, isLoading: isCreating } = useCreateUser();
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();
  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Invalid email format";
    return "";
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }
    createUser(
      { name, email },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setFormError("");
        },
        onError: () => setFormError("Failed to create user"),
      }
    );
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setFormError("");
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }
    if (editingUser) {
      updateUser(
        { id: editingUser.id, name, email },
        {
          onSuccess: () => {
            setEditingUser(null);
            setName("");
            setEmail("");
            setFormError("");
          },
          onError: () => setFormError("Failed to update user"),
        }
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setFormError("");
  };

  if (isLoading) return <div>Loading users...</div>;
  if (isError)
    return <div>Error: {error?.message || "Failed to load users"}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}{" "}
              <button
                onClick={() => handleEditClick(user)}
                disabled={isDeleting || isCreating || isUpdating}
                aria-label={`Edit user ${user.name}`}
              >
                Edit
              </button>{" "}
              <button
                onClick={() => deleteUser({ id: user.id })}
                disabled={isDeleting || isCreating || isUpdating}
                aria-label={`Delete user ${user.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}

      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <form onSubmit={editingUser ? handleUpdateSubmit : handleCreateSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={formError.includes("Name") ? "true" : "false"}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {formError && <p style={{ color: "red" }}>{formError}</p>}
        <button type="submit" disabled={isCreating || isUpdating || isDeleting}>
          {editingUser
            ? isUpdating
              ? "Updating..."
              : "💾 Update User"
            : isCreating
            ? "Adding..."
            : "Add User"}
        </button>
        {editingUser && (
          <button
            type="button"
            onClick={handleCancelEdit}
            disabled={isCreating || isUpdating || isDeleting}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default App;
