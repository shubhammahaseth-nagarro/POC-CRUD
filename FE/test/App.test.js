import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function renderWithClient(ui) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

test("renders user list", async () => {
  renderWithClient(<App />);

  expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
});

test("create new user", async () => {
  renderWithClient(<App />);

  await waitFor(() => {
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: "Alice" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "alice@example.com" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Add User/i }));

  await waitFor(() => {
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
  });
});

test("update existing user", async () => {
  renderWithClient(<App />);

  await waitFor(() => {
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole("button", { name: /Edit user John Doe/i }));

  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: "John Updated" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Update User/i }));

  await waitFor(() => {
    expect(screen.getByText(/John Updated/i)).toBeInTheDocument();
  });
});

test("delete user", async () => {
  renderWithClient(<App />);

  await waitFor(() => {
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  fireEvent.click(
    screen.getByRole("button", { name: /Delete user John Doe/i })
  );

  await waitFor(() => {
    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
  });
});
