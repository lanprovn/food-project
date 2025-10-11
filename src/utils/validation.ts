/**
 * Validation utilities for form inputs and data
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns ValidationResult object
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email là bắt buộc' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email không hợp lệ' };
  }
  
  return { isValid: true };
};

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns ValidationResult object
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Mật khẩu là bắt buộc' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'Mật khẩu phải có ít nhất 6 ký tự' };
  }
  
  if (password.length > 128) {
    return { isValid: false, error: 'Mật khẩu không được vượt quá 128 ký tự' };
  }
  
  return { isValid: true };
};

/**
 * Validates phone number format
 * @param phone - Phone number string to validate
 * @returns ValidationResult object
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, error: 'Số điện thoại là bắt buộc' };
  }
  
  const phoneRegex = /^(\+84|84|0)[1-9][0-9]{8,9}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { isValid: false, error: 'Số điện thoại không hợp lệ' };
  }
  
  return { isValid: true };
};

/**
 * Validates name format
 * @param name - Name string to validate
 * @returns ValidationResult object
 */
export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'Tên là bắt buộc' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Tên phải có ít nhất 2 ký tự' };
  }
  
  if (name.trim().length > 50) {
    return { isValid: false, error: 'Tên không được vượt quá 50 ký tự' };
  }
  
  const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠưăâêôơ\s]+$/;
  if (!nameRegex.test(name.trim())) {
    return { isValid: false, error: 'Tên chỉ được chứa chữ cái và khoảng trắng' };
  }
  
  return { isValid: true };
};

/**
 * Validates address format
 * @param address - Address string to validate
 * @returns ValidationResult object
 */
export const validateAddress = (address: string): ValidationResult => {
  if (!address) {
    return { isValid: false, error: 'Địa chỉ là bắt buộc' };
  }
  
  if (address.trim().length < 10) {
    return { isValid: false, error: 'Địa chỉ phải có ít nhất 10 ký tự' };
  }
  
  if (address.trim().length > 200) {
    return { isValid: false, error: 'Địa chỉ không được vượt quá 200 ký tự' };
  }
  
  return { isValid: true };
};

/**
 * Sanitizes input string to prevent XSS
 * @param input - Input string to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validates order ID format
 * @param orderId - Order ID string to validate
 * @returns ValidationResult object
 */
export const validateOrderId = (orderId: string): ValidationResult => {
  if (!orderId) {
    return { isValid: false, error: 'Mã đơn hàng là bắt buộc' };
  }
  
  const orderIdRegex = /^[A-Z0-9]{6,12}$/;
  if (!orderIdRegex.test(orderId.toUpperCase())) {
    return { isValid: false, error: 'Mã đơn hàng không hợp lệ' };
  }
  
  return { isValid: true };
};
