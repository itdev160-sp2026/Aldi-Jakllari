console.log("=== Activity 9: Contact Form Validation ===");

// Get form reference
const contactForm = document.getElementById("contactForm");

// Application state for validation
const validationState = {
    name: false,
    email: false,
    message: false,
};

// Email validation pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Part A: Validation Functions
function validateName(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        return {
            isValid: false,
            message: "Name is required."
        };
    }

    if (trimmedValue.length < 2) {
        return {
            isValid: false,
            message: "Name must be at least 2 characters long."
        };
    }

    console.log("Validating name: ✓ Valid");
    return {
        isValid: true,
        message: ""
    };
}

function validateEmail(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        return {
            isValid: false,
            message: "Email address is required."
        };
    }

    if (!emailPattern.test(trimmedValue)) {
        return {
            isValid: false,
            message: "Please enter a valid email address (e.g., name@example.com)."
        };
    }

    console.log("Validating email: ✓ Valid");
    return {
        isValid: true,
        message: ""
    };
}

function validateMessage(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        return {
            isValid: false,
            message: "Message is required."
        };
    }

    if (trimmedValue.length < 10) {
        return {
            isValid: false,
            message: "Message must be at least 10 characters long."
        };
    }

    console.log("Validating message: ✓ Valid");
    return {
        isValid: true,
        message: ""
    };
}

// Part B: Real-time Validation Feedback
function showValidationMessage(fieldName, validation) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName);

    // Clear previous state
    errorElement.classList.remove("show");
    inputElement.classList.remove("valid", "invalid");

    if (!validation.isValid && validation.message) {
        errorElement.textContent = validation.message;
        errorElement.classList.add("show");
        inputElement.classList.add("invalid");
    } else if (validation.isValid) {
        inputElement.classList.add("valid");
    }
}

function validateField(fieldName, value) {
    let validation;

    switch (fieldName) {
        case "name":
            validation = validateName(value);
            break;
        case "email":
            validation = validateEmail(value);
            break;
        case "message":
            validation = validateMessage(value);
            break;
        default:
            console.warn(`Unknown field: ${fieldName}`);
            return false;
    }

    validationState[fieldName] = validation.isValid;
    showValidationMessage(fieldName, validation);
    updateSubmitButton();

    return validation.isValid;
}

function updateSubmitButton() {
    const submitBtn = document.getElementById("submitBtn");
    const isFormValid = Object.values(validationState).every(isValid => isValid === true);

    submitBtn.disabled = !isFormValid;

    console.log("Form validation state:", validationState);
    console.log("Form is valid:", isFormValid);
}

// Setup validation event listeners
function setupValidationListeners() {
    console.log("Setting up validation event listeners...");

    // Add input and blur event listeners to each field
    ["name", "email", "message"].forEach((fieldName) => {
        const element = document.getElementById(fieldName);

        // Input event - validates as user types
        element.addEventListener("input", (e) => {
            console.log(`Input event on ${fieldName}:`, e.target.value);
            validateField(fieldName, e.target.value);
        });

        // Blur event - validates when field loses focus
        element.addEventListener("blur", (e) => {
            console.log(`Blur event on ${fieldName}:`, e.target.value);
            validateField(fieldName, e.target.value);
        });
    });
}

// Part C: Form Submission Handling
function handleFormSubmit(e) {
    // Prevent default form submission (page reload)
    e.preventDefault();
    console.log("\n=== FORM SUBMISSION ATTEMPT ===");

    // Hide previous success message
    document.getElementById("formSuccess").classList.add("hidden");

    // Validate all fields before submission
    const formData = new FormData(contactForm);
    let isFormValid = true;

    ["name", "email", "message"].forEach((fieldName) => {
        const value = formData.get(fieldName) || "";
        if (!validateField(fieldName, value)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        console.log("✓ Form validation successful!");

        // Log all form data to console
        console.log("Form data submitted:");
        for (let [key, value] of formData.entries()) {
            console.log(`  ${key}: ${value}`);
        }

        // Show success message
        const successDiv = document.getElementById("formSuccess");
        successDiv.classList.remove("hidden");

        // Optional: Scroll to success message
        successDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });

        console.log("Form submitted successfully!");
    } else {
        console.log("✗ Form validation failed - please fix errors");
    }
}

// Initialize application
function initializeApp() {
    console.log("Initializing Contact Form Validation application...");

    // Add form submit event listener
    contactForm.addEventListener("submit", handleFormSubmit);

    // Setup real-time validation
    setupValidationListeners();

    // Initialize submit button state
    updateSubmitButton();

    console.log("Contact Form Validation application initialized!");
    console.log("Try filling out the form and see real-time validation in action!");
}

// Start the application
initializeApp();