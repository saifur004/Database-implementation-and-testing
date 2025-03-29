import { render, fireEvent, screen } from '@testing-library/react';
import FormComponent from '../components/FormComponent';
!

describe('Form Validation Tests', () => {
  test('should display error message for empty required fields', () => {
    render(<FormComponent />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/this field is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('should accept valid inputs', () => {
    render(<FormComponent />);
    
    const inputField = screen.getByLabelText(/name/i);
    fireEvent.change(inputField, { target: { value: 'John Doe' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const successMessage = screen.getByText(/form submitted successfully/i);
    expect(successMessage).toBeInTheDocument();
  });
});
