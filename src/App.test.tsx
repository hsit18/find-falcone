import React from 'react';
import { render, screen } from './setupTests';
import App from './App';

test('renders Falcone Page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Finding Falcone !/i);
  expect(linkElement).toBeInTheDocument();
});
