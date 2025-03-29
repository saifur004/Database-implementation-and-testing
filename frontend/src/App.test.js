import { render, screen } from "@testing-library/react";
import UserList from "./components/UserList";

test("renders UserList component", () => {
  render(<UserList />);
  const heading = screen.getByText(/User Management/i);
  expect(heading).toBeInTheDocument();
});
