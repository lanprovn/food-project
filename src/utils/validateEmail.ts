/**
 * Validate email address
 * @param email - Email address to validate
 * @returns True if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Vietnamese phone number
 * @param phone - Phone number to validate
 * @returns True if phone number is valid, false otherwise
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with validation result and message
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 chữ thường' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 chữ hoa' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 số' };
  }
  
  return { isValid: true, message: 'Mật khẩu hợp lệ' };
};

/**
 * Validate Vietnamese name
 * @param name - Name to validate
 * @returns True if name is valid, false otherwise
 */
export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠưăâêôơ\s]+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
};
