import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Logo from '../components/Logo';
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Logo to exist', () => {
  render(<Logo />);
  expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
});
