// Form validation utilities

export function validateRequired(value, fieldName = "This field") {
  if (!value || value.trim() === "") {
    return {
      valid: false,
      message: `${fieldName} is required`,
    };
  }
  return { valid: true };
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      message: "Please enter a valid email address",
    };
  }
  return { valid: true };
}

export function validateURL(url) {
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return {
      valid: false,
      message: "Please enter a valid URL",
    };
  }
}

export function validateConnectionId(id) {
  // Connection ID should be lowercase, alphanumeric, dashes, underscores only
  const idRegex = /^[a-z0-9_-]+$/;
  if (!idRegex.test(id)) {
    return {
      valid: false,
      message:
        "Connection ID can only contain lowercase letters, numbers, dashes, and underscores",
    };
  }
  return { valid: true };
}

export function sanitizeConnectionId(name) {
  // Convert display name to URL-friendly connection ID
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^a-z0-9_-]/g, "") // Remove invalid characters
    .replace(/-+/g, "-") // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
}

export function validateForm(formData, rules) {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];

    fieldRules.forEach((rule) => {
      if (rule.type === "required") {
        const result = validateRequired(value, rule.message || field);
        if (!result.valid) {
          errors[field] = result.message;
          isValid = false;
        }
      } else if (rule.type === "email") {
        const result = validateEmail(value);
        if (!result.valid) {
          errors[field] = result.message;
          isValid = false;
        }
      } else if (rule.type === "url") {
        const result = validateURL(value);
        if (!result.valid) {
          errors[field] = result.message;
          isValid = false;
        }
      } else if (rule.type === "custom" && rule.validator) {
        const result = rule.validator(value);
        if (!result.valid) {
          errors[field] = result.message;
          isValid = false;
        }
      }
    });
  });

  return { isValid, errors };
}

export function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  // Remove existing error
  const existingError = field.parentElement.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }

  // Add error class to field
  field.classList.add("error");

  // Create and add error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  field.parentElement.appendChild(errorDiv);
}

export function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  field.classList.remove("error");
  const errorDiv = field.parentElement.querySelector(".field-error");
  if (errorDiv) {
    errorDiv.remove();
  }
}

export function clearAllErrors(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.querySelectorAll(".error").forEach((field) => {
    field.classList.remove("error");
  });

  form.querySelectorAll(".field-error").forEach((error) => {
    error.remove();
  });
}

// Made with Bob
