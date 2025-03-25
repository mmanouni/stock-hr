window.addEventListener('DOMContentLoaded', () => {
    try {
        const token = sessionStorage.getItem('authToken'); // ✅ Use sessionStorage
        console.log("🔍 Stored Token:", token);

        if (token) {
            console.log("✅ Token found, redirecting to dashboard...");
            window.location.href = "dashboard.html";
        } else {
            console.log("🔐 No token found, staying on login page...");
        }
    } catch (error) {
        console.error("❌ Error accessing sessionStorage:", error);
    }
});
