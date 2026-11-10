
// ======================================
// 1. GET HTML ELEMENTS
// ======================================

const loginForm = document.getElementById("loginForm");

const signupForm = document.getElementById("signupForm");

const loginContainer = document.getElementById(
    "loginFormContainer"
);

const signupContainer = document.getElementById(
    "signupFormContainer"
);

const successMessage = document.getElementById(
    "successMessage"
);


// ======================================
// 2. FORM SWITCHING
// ======================================

const showSignup = document.getElementById("showSignup");

const showLogin = document.getElementById("showLogin");

function switchForm(formType) {

    successMessage.classList.remove("show");

    if (formType === "signup") {

        loginContainer.classList.remove("active");

        signupContainer.classList.add("active");

    } else {

        signupContainer.classList.remove("active");

        loginContainer.classList.add("active");

    }

}

showSignup.addEventListener("click", () => {

    switchForm("signup");

});

showLogin.addEventListener("click", () => {

    switchForm("login");

});


// ======================================
// 3. COMMON VALIDATION FUNCTIONS
// ======================================

// Display error message

function showError(input, errorId, message) {

    const errorElement = document.getElementById(errorId);

    errorElement.textContent = message;

    input.classList.add("invalid");

    input.classList.remove("valid");

}


// Display success state

function showSuccess(input, errorId) {

    const errorElement = document.getElementById(errorId);

    errorElement.textContent = "";

    input.classList.remove("invalid");

    input.classList.add("valid");

}


// Email validation using Regular Expression

function validateEmail(email) {

    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);

}


// Password validation

function validatePassword(password) {

    return password.length >= 8;

}


// ======================================
// 4. PASSWORD VISIBILITY
// ======================================

const toggleButtons = document.querySelectorAll(
    ".toggle-password"
);

toggleButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;

        const passwordInput = document.getElementById(targetId);

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            button.textContent = "Hide";

            button.setAttribute("aria-label", "Hide password");

        } else {

            passwordInput.type = "password";

            button.textContent = "Show";

            button.setAttribute("aria-label", "Show password");

        }

    });

});


// ======================================
// 5. LOGIN FORM VALIDATION
// ======================================

const loginEmail = document.getElementById("loginEmail");

const loginPassword = document.getElementById("loginPassword");

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    let isValid = true;

    const emailValue = loginEmail.value.trim();

    const passwordValue = loginPassword.value;


    // EMAIL CHECK

    if (emailValue === "") {

        showError(
            loginEmail,
            "loginEmailError",
            "Email address is required."
        );

        isValid = false;

    } else if (!validateEmail(emailValue)) {

        showError(
            loginEmail,
            "loginEmailError",
            "Please enter a valid email address."
        );

        isValid = false;

    } else {

        showSuccess(loginEmail, "loginEmailError");

    }


    // PASSWORD CHECK

    if (passwordValue === "") {

        showError(
            loginPassword,
            "loginPasswordError",
            "Password is required."
        );

        isValid = false;

    } else if (!validatePassword(passwordValue)) {

        showError(
            loginPassword,
            "loginPasswordError",
            "Password must contain at least 8 characters."
        );

        isValid = false;

    } else {

        showSuccess(loginPassword, "loginPasswordError");

    }


    // LOGIN RESULT

    if (isValid) {

        successMessage.textContent =
            "✓ Login form validated successfully! " +
            "Connect a backend to authenticate your account.";

        successMessage.classList.add("show");

        loginForm.reset();

        loginEmail.classList.remove("valid");

        loginPassword.classList.remove("valid");

    }

});


// ======================================
// 6. PASSWORD STRENGTH CHECKER
// ======================================

const signupPassword = document.getElementById(
    "signupPassword"
);

const strengthBar = document.getElementById("strengthBar");

const strengthText = document.getElementById("strengthText");


function checkPasswordStrength(password) {

    let strength = 0;

    if (password.length >= 8) {
        strength++;
    }

    if (/[A-Z]/.test(password)) {
        strength++;
    }

    if (/[a-z]/.test(password)) {
        strength++;
    }

    if (/[0-9]/.test(password)) {
        strength++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }


    const levels = [
        {
            width: "0%",
            text: "Not entered",
            color: "transparent"
        },
        {
            width: "20%",
            text: "Very Weak",
            color: "#dc5555"
        },
        {
            width: "40%",
            text: "Weak",
            color: "#e58d45"
        },
        {
            width: "60%",
            text: "Medium",
            color: "#d6b844"
        },
        {
            width: "80%",
            text: "Strong",
            color: "#68a86e"
        },
        {
            width: "100%",
            text: "Very Strong",
            color: "#319568"
        }
    ];

    const result = levels[strength];

    strengthBar.style.width = result.width;

    strengthBar.style.backgroundColor = result.color;

    strengthText.textContent =
        "Password strength: " + result.text;

}


// Update password strength while typing

signupPassword.addEventListener("input", () => {

    checkPasswordStrength(signupPassword.value);

});


// ======================================
// 7. SIGNUP FORM VALIDATION
// ======================================

const fullName = document.getElementById("fullName");

const signupEmail = document.getElementById("signupEmail");

const confirmPassword = document.getElementById(
    "confirmPassword"
);

const terms = document.getElementById("terms");


signupForm.addEventListener("submit", (event) => {

    event.preventDefault();

    let isValid = true;


    const nameValue = fullName.value.trim();

    const emailValue = signupEmail.value.trim();

    const passwordValue = signupPassword.value;

    const confirmValue = confirmPassword.value;


    // NAME VALIDATION

    if (nameValue === "") {

        showError(
            fullName,
            "nameError",
            "Full name is required."
        );

        isValid = false;

    } else if (nameValue.length < 3) {

        showError(
            fullName,
            "nameError",
            "Name must contain at least 3 characters."
        );

        isValid = false;

    } else if (!/^[a-zA-Z ]+$/.test(nameValue)) {

        showError(
            fullName,
            "nameError",
            "Please enter a valid name using letters only."
        );

        isValid = false;

    } else {

        showSuccess(fullName, "nameError");

    }


    // EMAIL VALIDATION

    if (emailValue === "") {

        showError(
            signupEmail,
            "signupEmailError",
            "Email address is required."
        );

        isValid = false;

    } else if (!validateEmail(emailValue)) {

        showError(
            signupEmail,
            "signupEmailError",
            "Please enter a valid email address."
        );

        isValid = false;

    } else {

        showSuccess(signupEmail, "signupEmailError");

    }


    // PASSWORD VALIDATION

    if (passwordValue === "") {

        showError(
            signupPassword,
            "signupPasswordError",
            "Password is required."
        );

        isValid = false;

    } else if (!validatePassword(passwordValue)) {

        showError(
            signupPassword,
            "signupPasswordError",
            "Password must contain at least 8 characters."
        );

        isValid = false;

    } else {

        showSuccess(
            signupPassword,
            "signupPasswordError"
        );

    }


    // CONFIRM PASSWORD VALIDATION

    if (confirmValue === "") {

        showError(
            confirmPassword,
            "confirmPasswordError",
            "Please confirm your password."
        );

        isValid = false;

    } else if (confirmValue !== passwordValue) {

        showError(
            confirmPassword,
            "confirmPasswordError",
            "Passwords do not match."
        );

        isValid = false;

    } else {

        showSuccess(
            confirmPassword,
            "confirmPasswordError"
        );

    }


    // TERMS VALIDATION

    if (!terms.checked) {

        document.getElementById("termsError").textContent =
            "Please accept the terms and conditions.";

        isValid = false;

    } else {

        document.getElementById("termsError").textContent = "";

    }


    // SIGNUP RESULT

    if (isValid) {

        const userName = nameValue;

        successMessage.textContent =
            "✓ Congratulations, " + userName +
            "! Your signup form has been validated successfully.";

        successMessage.classList.add("show");

        signupForm.reset();

        // Clear password strength

        checkPasswordStrength("");

        // Remove validation styles

        document.querySelectorAll(".input-group input").forEach(
            (input) => {

                input.classList.remove("valid", "invalid");

            }
        );

    }

});


// ======================================
// 8. FORGOT PASSWORD
// ======================================

const forgotPassword = document.getElementById(
    "forgotPassword"
);

forgotPassword.addEventListener("click", (event) => {

    event.preventDefault();

    successMessage.textContent =
        "Please contact the support team to reset your password.";

    successMessage.classList.add("show");

});

