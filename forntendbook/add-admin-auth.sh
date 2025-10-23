#!/bin/bash

# List of admin pages that need protection
ADMIN_PAGES=(
    "AdminPendingOrdersSavenday.html"
    "Admin order summery.html"
    "AdminBookDelete.html"
    "BenerAdmin.html"
    "BookUpdate Admin.html"
    "admin-all-ordersWithUpdate.html"
    "orderAdmin-analytics.html"
    "video and imag showAdmin.html"
    "book-upload.html"
    "uploadcsv.html"
    "manageusers.html"
)

# Add auth script to each admin page
for page in "${ADMIN_PAGES[@]}"; do
    if [ -f "$page" ]; then
        echo "Adding auth protection to $page"
        
        # Check if admin-auth.js is already included
        if ! grep -q "admin-auth.js" "$page"; then
            # Add the script tag before </head>
            sed -i '' 's|</head>|    <script src="admin-auth.js"></script>\n</head>|' "$page"
            echo "✅ Added auth to $page"
        else
            echo "⚠️  Auth already exists in $page"
        fi
    else
        echo "❌ File not found: $page"
    fi
done

echo "Admin authentication setup complete!"
