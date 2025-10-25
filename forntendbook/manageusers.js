document.addEventListener("DOMContentLoaded", () => {
  console.log("🔍 Manage Users page loaded");
  
  const userListContainer = document.getElementById("userList");
  const userDetailContainer = document.getElementById("userDetail");
  const userInfoContainer = document.getElementById("userInfo");
  const userOrdersContainer = document.getElementById("userOrders");
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
      
      const response = await fetch('/api/auth/all-users', {
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

  // Show user details and orders
  window.showUserDetail = async function(userId) {
    const user = allUsers.find(u => u._id === userId);
    if (user && userInfoContainer) {
      // Display user info
      userInfoContainer.innerHTML = `
        <h3>User Details</h3>
        <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${user.email || 'N/A'}</p>
        <p><strong>Mobile:</strong> ${user.mobile || 'N/A'}</p>
        <p><strong>Login Method:</strong> ${user.loginMethod || 'N/A'}</p>
        <p><strong>Role:</strong> ${user.role || 'user'}</p>
        <p><strong>User ID:</strong> ${user._id}</p>
        <p><strong>Created:</strong> ${new Date(user.createdAt).toLocaleString()}</p>
      `;
      
      // Load user orders
      await loadUserOrders(user.email, user._id);
    }
  };

  // Load orders for a specific user
  async function loadUserOrders(userEmail, userId) {
    try {
      userOrdersContainer.innerHTML = "<p>Loading orders...</p>";
      
      const response = await fetch(`/api/user-orders?email=${encodeURIComponent(userEmail)}&userId=${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.orders) {
        displayUserOrders(data.orders);
      } else {
        userOrdersContainer.innerHTML = `<p>No orders found for this user.</p>`;
      }
    } catch (error) {
      console.error("Error loading user orders:", error);
      userOrdersContainer.innerHTML = `<p>Error loading orders: ${error.message}</p>`;
    }
  }

  // Display user orders with dropdown
  function displayUserOrders(orders) {
    if (orders.length === 0) {
      userOrdersContainer.innerHTML = "<p>No orders found for this user.</p>";
      return;
    }

    let html = `
      <h3>User Orders (${orders.length})</h3>
      <select class="order-dropdown" id="orderSelect" onchange="showOrderDetails()">
        <option value="">Select an order to view details</option>
    `;
    
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      html += `<option value="${order._id}">Order ID: ${order.orderId} - ₹${order.totalPrice} - ${order.status} - ${orderDate}</option>`;
    });
    
    html += `</select><div id="orderDetailsContainer"></div>`;
    
    userOrdersContainer.innerHTML = html;
    
    // Store orders for details display
    window.currentUserOrders = orders;
  }

  // Show order details
  window.showOrderDetails = function() {
    const selectElement = document.getElementById('orderSelect');
    const orderDetailsContainer = document.getElementById('orderDetailsContainer');
    const selectedOrderId = selectElement.value;
    
    if (!selectedOrderId || !window.currentUserOrders) {
      orderDetailsContainer.innerHTML = '';
      return;
    }
    
    const order = window.currentUserOrders.find(o => o._id === selectedOrderId);
    if (!order) return;
    
    let html = `
      <div class="order-details">
        <h4>Order Details</h4>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Status:</strong> <span style="color: ${getStatusColor(order.status)}">${order.status}</span></p>
        <p><strong>Total Amount:</strong> ₹${order.totalPrice}</p>
        <p><strong>Payment ID:</strong> ${order.paymentId || 'N/A'}</p>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
        <button class="btn-details" onclick="window.open('order-details.html?id=${order._id}','_blank')">View Full Order Details</button>
        
        <h5>Delivery Details:</h5>
        <p><strong>Name:</strong> ${order.deliveryDetails.fullName}</p>
        <p><strong>Mobile:</strong> ${order.deliveryDetails.mobile}</p>
        <p><strong>Email:</strong> ${order.deliveryDetails.email}</p>
        <p><strong>Address:</strong> ${order.deliveryDetails.address}, ${order.deliveryDetails.city}, ${order.deliveryDetails.state} - ${order.deliveryDetails.pincode}</p>
        
        <h5>Books Ordered:</h5>
    `;
    
    order.books.forEach(book => {
      html += `
        <div class="order-item">
          <p><strong>Title:</strong> ${book.title}</p>
          <p><strong>Price:</strong> ₹${book.price}</p>
          <p><strong>Quantity:</strong> ${book.quantity}</p>
          <p><strong>Subtotal:</strong> ₹${book.price * book.quantity}</p>
        </div>
      `;
    });
    
    if (order.trackingId) {
      html += `<p><strong>Tracking ID:</strong> ${order.trackingId}</p>`;
    }
    
    html += `</div>`;
    
    orderDetailsContainer.innerHTML = html;
  };

  // Get status color
  function getStatusColor(status) {
    const colors = {
      'Pending': '#ff9800',
      'Paid': '#4caf50',
      'Failed': '#f44336',
      'Cancelled': '#9e9e9e',
      'Shipped': '#2196f3',
      'Delivered': '#4caf50',
      'Refunded': '#ff5722'
    };
    return colors[status] || '#666';
  }

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
