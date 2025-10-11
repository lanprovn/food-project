import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ButtonFilled from '../shared/ButtonFilled';

describe('ButtonFilled', () => {
  it('renders button with text', () => {
    render(<ButtonFilled>Test Button</ButtonFilled>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<ButtonFilled>Test Button</ButtonFilled>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('applies secondary variant when specified', () => {
    render(<ButtonFilled variant="secondary">Test Button</ButtonFilled>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<ButtonFilled onClick={handleClick}>Test Button</ButtonFilled>);
    
    const button = screen.getByRole('button');
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<ButtonFilled disabled>Test Button</ButtonFilled>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
