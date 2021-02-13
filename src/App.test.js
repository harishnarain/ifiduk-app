import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
  const MockTest = () => (
    <div>
      <h1>learn react</h1>
    </div>
  );
  render(<MockTest />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
