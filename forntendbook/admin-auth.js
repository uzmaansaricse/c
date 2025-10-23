// Admin Authentication and Route Protection
class AdminAuth {
    constructor() {
        this.showLoadingScreen();
        this.checkAdminAccess();
    }

    showLoadingScreen() {
        // Create loading overlay
        const loadingHTML = `
            <div id="admin-loading" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(44, 110, 49, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                color: white;
                font-family: Arial, sans-serif;
            ">
                <div style="text-align: center;">
                    <div style="
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #fff;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    "></div>
                    <h3>Verifying Admin Access...</h3>
                    <p>Please wait while we authenticate your credentials</p>
                </div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    }

    hideLoadingScreen() {
        const loading = document.getElementById('admin-loading');
        if (loading) {
            loading.remove();
        }
    }

    async checkAdminAccess() {
        try {
            // Check for token in localStorage and cookies
            const token = localStorage.getItem('token') || this.getCookie('token');
            
            if (!token) {
                this.redirectToLogin();
                return;
            }

            // Verify token with backend
            const response = await fetch('/api/auth/verify-admin', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok || !data.valid || data.role !== 'admin') {
                this.showAccessDenied();
                return;
            }

            // Success - hide loading and show page
            this.hideLoadingScreen();
            
        } catch (error) {
            console.error('Auth check failed:', error);
            this.redirectToLogin();
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    redirectToLogin() {
        this.hideLoadingScreen();
        alert('Please login to access admin panel');
        window.location.href = '/signup-login.html';
    }

    showAccessDenied() {
        this.hideLoadingScreen();
        alert('Access Denied! Admin privileges required.');
        window.location.href = '/index.html';
    }
}

// Initialize admin auth when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new AdminAuth();
});
