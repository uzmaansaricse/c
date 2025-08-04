// JavaScript for Manage Users page with order search filters


document.addEventListener("DOMContentLoaded", () => {
  const searchName = document.getElementById("searchName");
  const searchEmail = document.getElementById("searchEmail");
  const searchMobile = document.getElementById("searchMobile");
  const searchOrderId = document.getElementById("searchOrderId");
  const userListContainer = document.getElementById("userList");
  const userDetailContainer = document.getElementById("userDetail");

  // Function to fetch orders with delivery details
  async function fetchOrdersWithDeliveryDetails(name, email, mobile, orderId) {
    const token = localStorage.getItem('token');
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (name) params.append('searchByName', name);
      if (email) params.append('searchByEmail', email);
      if (mobile) params.append('searchByMobile', mobile);
      if (orderId) params.append('searchByOrderId', orderId);

      const res = await fetch(`/api/admin/all-orders?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      return data.orders || [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  }

  // Function to render orders list
  function renderOrdersList(orders) {
    userListContainer.innerHTML = "";
    if (orders.length === 0) {
      userListContainer.innerHTML = "<p>No orders found.</p>";
      userDetailContainer.innerHTML = "";
      return;
    }
    orders.forEach(order => {
      const orderItem = document.createElement("div");
      orderItem.classList.add("order-item");
      orderItem.innerHTML = `
        <strong>Order ID:</strong> ${order._id}<br/>
        <strong>Name:</strong> ${order.deliveryDetails.fullName}<br/>
        <strong>Email:</strong> ${order.deliveryDetails.email || "N/A"}<br/>
        <strong>Mobile:</strong> ${order.deliveryDetails.mobile}<br/>
        <strong>Status:</strong> ${order.status}<br/>
        <strong>Total:</strong> ₹${order.totalPrice}<br/>
        <hr/>
      `;
      orderItem.style.cursor = "pointer";
      orderItem.addEventListener("click", async () => {
        const detail = await fetchOrderDetail(order._id);
        renderOrderDetail(detail);
      });
      userListContainer.appendChild(orderItem);
    });
  }

  // Function to fetch order detail by ID
  async function fetchOrderDetail(orderId) {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/admin/order/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching order detail:", error);
      return null;
    }
  }

  // Function to render order detail
  function renderOrderDetail(order) {
    if (!order) {
      userDetailContainer.innerHTML = "<p>Order details not found.</p>";
      return;
    }
    userDetailContainer.innerHTML = `
      <h3>Order Details</h3>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Name:</strong> ${order.deliveryDetails.fullName}</p>
      <p><strong>Email:</strong> ${order.deliveryDetails.email || "N/A"}</p>
      <p><strong>Mobile:</strong> ${order.deliveryDetails.mobile}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Total Price:</strong> ₹${order.totalPrice}</p>
      <h4>Books:</h4>
      <ul>
        ${order.books.map(book => `
          <li>${book.bookId.title} - ₹${book.price} x ${book.quantity}</li>
        `).join("")}
      </ul>
      <p><strong>Address:</strong> ${order.deliveryDetails.address || "N/A"}</p>
      <p><strong>City:</strong> ${order.deliveryDetails.city || "N/A"}</p>
      <p><strong>State:</strong> ${order.deliveryDetails.state || "N/A"}</p>
      <p><strong>Pincode:</strong> ${order.deliveryDetails.pincode || "N/A"}</p>
    `;
  }

  // Event listeners for search filters
  [searchName, searchEmail, searchMobile, searchOrderId].forEach(input => {
    input.addEventListener("input", async () => {
      const name = searchName.value.trim();
      const email = searchEmail.value.trim();
      const mobile = searchMobile.value.trim();
      const orderId = searchOrderId.value.trim();
      const orders = await fetchOrdersWithDeliveryDetails(name, email, mobile, orderId);
      renderOrdersList(orders);
    });
  });
});

  // Function to fetch user detail by ID
  async function fetchUserDetail(userId) {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      return data.user;
    } catch (error) {
      console.error("Error fetching user detail:", error);
      return null;
    }
  }

  // Function to render user list
  function renderUserList(users) {
    userListContainer.innerHTML = "";
    if (users.length === 0) {
      userListContainer.innerHTML = "<p>No users found.</p>";
      userDetailContainer.innerHTML = "";
      return;
    }
    users.forEach(user => {
      const userItem = document.createElement("div");
      userItem.classList.add("user-item");
      userItem.textContent = `${user.name} - ${user.mobile} - ${user.email || "No Email"}`;
      userItem.style.cursor = "pointer";
      userItem.addEventListener("click", async () => {
        const detail = await fetchUserDetail(user._id);
        renderUserDetail(detail);
      });
      userListContainer.appendChild(userItem);
    });
  }

  // Function to render user detail
  function renderUserDetail(user) {
    if (!user) {
      userDetailContainer.innerHTML = "<p>User details not found.</p>";
      return;
    }
    userDetailContainer.innerHTML = `
      <h3>User Detail</h3>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Mobile:</strong> ${user.mobile}</p>
      <p><strong>Email:</strong> ${user.email || "No Email"}</p>
      <p><strong>Role:</strong> ${user.role}</p>
      <p><strong>Created At:</strong> ${new Date(user.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> ${new Date(user.updatedAt).toLocaleString()}</p>
    `;
  }

  // Event listener for search input
  // Removed unused searchInput event listener to avoid errors
