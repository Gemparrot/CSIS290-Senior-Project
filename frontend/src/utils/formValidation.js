export const validateText = (text, minLength = 1) => {
    return text && text.trim().length >= minLength;
  };
  
  export const validateNumber = (number, min = 0, max = Infinity) => {
    return !isNaN(number) && number >= min && number <= max;
  };
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password, minLength = 6) => {
    return password && password.length >= minLength;
  };
  