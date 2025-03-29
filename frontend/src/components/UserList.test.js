import { render, screen } from '@testing-library/react';
import UserList from './UserList'; // Make sure the path is correct

test('renders UserList component', () => {
  render(<UserList />);
  const heading = screen.getByText(/User Management/i); // This is real UI text
  expect(heading).toBeInTheDocument();
});
