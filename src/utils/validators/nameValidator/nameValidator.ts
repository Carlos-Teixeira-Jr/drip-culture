export function validateName(name: string): {errorMsg: string, isValid: boolean} {
  let nameValue = name.trim();
  let errorMsg = "";
  if (nameValue.length < 3) {
    errorMsg = "Name must be at least 3 characters";
  } else if (nameValue.length > 80) {
    errorMsg = "Name must be less than 80 characters";
  }

  return {
    errorMsg: errorMsg,
    isValid: errorMsg === "",
  };
}