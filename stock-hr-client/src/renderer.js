window.addEventListener('DOMContentLoaded', () => {
  try {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      window.location.href = "dashboard.html";
    }
  } catch (error) {
    console.error("Error accessing sessionStorage:", error);
  }
});

async function loadDepartments() {
  try {
      const response = await fetch("http://localhost:3000/api/departments", {
          headers: {
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
      });
      const departments = await response.json();

      const select = document.getElementById("departmentIdHR");
      select.innerHTML = `<option value="">Select Department</option>`; // Reset options

      departments.forEach(dept => {
          const option = document.createElement("option");
          option.value = dept.id;
          option.textContent = dept.name;
          select.appendChild(option);
      });

      console.log("✅ Departments loaded:", departments);
  } catch (error) {
      console.error("⚠️ Error loading departments:", error);
  }
}

// Load departments when the page is ready
//document.addEventListener("DOMContentLoaded", loadDepartments);
