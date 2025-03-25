// ...existing code...

function isAuthenticated() {
  // Implement your authentication check logic here
  // For example, check if a token exists in localStorage
  return localStorage.getItem('authToken') !== null;
}

document.addEventListener('DOMContentLoaded', () => {
  if (isAuthenticated()) {
    window.location.href = `${process.env.REACT_APP_API_URL}/dashboard.html`; // Ensure the correct path to dashboard.html
  }
});

// ...existing code...
