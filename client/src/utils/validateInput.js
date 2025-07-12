export const validateInput = ({ email, password, name }) => {
  // Email validation
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false;
  }
  
  // Password validation (at least 6 characters)
  if (password && password.length < 6) {
    return false;
  }
  
  // Name validation (if provided, should not be empty)
  if (name && name.trim().length === 0) {
    return false;
  }
  
  return true;
}; 