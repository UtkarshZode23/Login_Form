// Add event listener to the form for submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  
  // Clear any previous error messages
  document.getElementById("username-error").textContent = "";
  document.getElementById("password-error").textContent = "";
  
  // Get the form values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  let isValid = true;

  // Basic validation for username (check if it's an email)
  if (!validateEmail(username)) {
    document.getElementById("username-error").textContent = "Please enter a valid email.";
    isValid = false;
  }

  // Password validation (minimum length check)
  if (password.length < 6) {
    document.getElementById("password-error").textContent = "Password must be at least 6 characters long.";
    isValid = false;
  }

  // Proceed to login API call if the form is valid
  if (isValid) {
    loginUser(username, password);
  }
});

// Function to validate email format
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Function to send login request to API
function loginUser(username, password) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("response-message").textContent = "Login successful!";
    console.log("Success:", data);
  })
  .catch(error => {
    document.getElementById("response-message").textContent = "Login failed!";
    console.error("Error:", error);
  });
}

// Toggle Show/Hide Password functionality
document.getElementById("show-password").addEventListener("change", function() {
  const passwordInput = document.getElementById("password");
  if (this.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
