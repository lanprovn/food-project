import React from 'react';

/**
 * Props interface for ButtonFilled component
 */
interface ButtonFilledProps {
  /** Content to display inside the button */
  children: React.ReactNode;
  /** Click handler function */
  onClick?: () => void;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A reusable filled button component with multiple variants and sizes
 * 
 * @param props - ButtonFilledProps
 * @returns JSX.Element
 * 
 * @example
 * ```tsx
 * <ButtonFilled variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </ButtonFilled>
 * ```
 */
const ButtonFilled: React.FC<ButtonFilledProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'pos-btn';
  
  const variantClasses = {
    primary: 'pos-btn-primary',
    secondary: 'pos-btn-secondary',
    danger: 'pos-btn-danger',
  };
  
  const sizeClasses = {
    sm: 'pos-btn-sm',
    md: 'pos-btn-md',
    lg: 'pos-btn-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default ButtonFilled;
