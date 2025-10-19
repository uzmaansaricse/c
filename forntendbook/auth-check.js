// Admin role verification utility
function checkAdminAccess() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = '/signup-login.html';
        return false;
    }
    
    // Verify token and role with backend
    fetch('/api/auth/verify-token', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if (!data.valid || data.role !== 'admin') {
            alert('Access denied. Admin privileges required.');
            window.location.href = '/index.html';
        }
    })
    .catch(() => {
        window.location.href = '/signup-login.html';
    });
    
    return true;
}

// Run check when page loads
document.addEventListener('DOMContentLoaded', checkAdminAccess);
