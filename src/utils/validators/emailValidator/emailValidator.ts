export function validateEmail(email: string): {
  errorMsg: string;
  isValid: boolean;
} {
  let emailValue = email.trim();
  let errorMsg = "";

  if (emailValue.length === 0) {
    errorMsg = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    errorMsg = "Invalid email format";
  }

  return {
    errorMsg: errorMsg,
    isValid: errorMsg === "",
  };
}