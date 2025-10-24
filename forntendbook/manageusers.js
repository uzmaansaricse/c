document.addEventListener("DOMContentLoaded", () => {
  console.log("🔍 Manage Users page loaded");
  
  const userListContainer = document.getElementById("userList");
  const userDetailContainer = document.getElementById("userDetail"); // Fixed ID
  const searchName = document.getElementById("searchName");
  const searchEmail = document.getElementById("searchEmail");
  const searchMobile = document.getElementById("searchMobile");
  
  if (!userListContainer) {
    console.error("❌ userList container not found");
    return;
  }

  let allUsers = [];

  // Load all users on page load
  loadUsers();

  async function loadUsers() {
    try {
      userListContainer.innerHTML = "<p>Loading users...</p>";
      
      const response = await fetch('http://localhost:9000/api/auth/all-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      
      if (data.success && data.users) {
        allUsers = data.users;
        displayUsers(allUsers);
      } else {
        userListContainer.innerHTML = `<p>Error: ${data.message || 'Failed to load users'}</p>`;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      userListContainer.innerHTML = `<p>Network error: ${error.message}. Make sure backend server is running on port 9000.</p>`;
    }
  }

  function displayUsers(users) {
    console.log("Displaying users:", users.length);
    
    if (users.length === 0) {
      userListContainer.innerHTML = "<p>No users found.</p>";
      return;
    }

    let html = `<h3>Total Users: ${users.length}</h3>`;
    
    users.forEach((user, index) => {
      html += `
        <div class="user-item" style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; background: white; border-radius: 5px; cursor: pointer;" onclick="showUserDetail('${user._id}')">
          <strong>${index + 1}. ${user.name || 'No Name'}</strong><br>
          <span style="color: #666;">Email: ${user.email || 'No Email'}</span><br>
          <span style="color: #666;">Mobile: ${user.mobile || 'No Mobile'}</span><br>
          <span style="color: #666;">Role: ${user.role || 'user'}</span><br>
          <span style="color: #666;">Joined: ${new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      `;
    });
    
    userListContainer.innerHTML = html;
    console.log("✅ Users displayed successfully");
  }

  // Show user details
  window.showUserDetail = function(userId) {
    const user = allUsers.find(u => u._id === userId);
    if (user && userDetailContainer) {
      userDetailContainer.innerHTML = `
        <h3>User Details</h3>
        <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${user.email || 'N/A'}</p>
        <p><strong>Mobile:</strong> ${user.mobile || 'N/A'}</p>
        <p><strong>Login Method:</strong> ${user.loginMethod || 'N/A'}</p>
        <p><strong>Role:</strong> ${user.role || 'user'}</p>
        <p><strong>User ID:</strong> ${user._id}</p>
        <p><strong>Created:</strong> ${new Date(user.createdAt).toLocaleString()}</p>
      `;
    }
  };

  // Search functionality
  function filterUsers() {
    const nameFilter = searchName?.value.toLowerCase() || '';
    const emailFilter = searchEmail?.value.toLowerCase() || '';
    const mobileFilter = searchMobile?.value.toLowerCase() || '';

    const filteredUsers = allUsers.filter(user => {
      const matchName = !nameFilter || (user.name && user.name.toLowerCase().includes(nameFilter));
      const matchEmail = !emailFilter || (user.email && user.email.toLowerCase().includes(emailFilter));
      const matchMobile = !mobileFilter || (user.mobile && user.mobile.includes(mobileFilter));
      
      return matchName && matchEmail && matchMobile;
    });

    displayUsers(filteredUsers);
  }

  // Add event listeners for search
  if (searchName) searchName.addEventListener('input', filterUsers);
  if (searchEmail) searchEmail.addEventListener('input', filterUsers);
  if (searchMobile) searchMobile.addEventListener('input', filterUsers);
});
