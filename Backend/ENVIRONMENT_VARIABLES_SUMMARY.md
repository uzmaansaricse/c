# 🔧 Environment Variables Summary

## 📋 **BACKEND ENVIRONMENT VARIABLES** (Set in Hostinger Backend)

### 🔹 Core Configuration (13 variables)
- `PORT` - Server port (Hostinger sets automatically)
- `JWT_SECRET` - Secret key for JWT tokens
- `MONGODB_URI` - MongoDB database connection string

### 🔹 Payment Gateway (Razorpay)
- `RAZORPAY_KEY_ID` - Razorpay public key
- `RAZORPAY_KEY_SECRET` - Razorpay secret key

### 🔹 Email Service (Gmail)
- `EMAIL_USER` - Gmail address for sending notifications
- `EMAIL_PASS` - 16-digit app password for the Gmail account

### 🔹 Cloudinary (Image & Video Storage)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### 🔹 OTP Services (Twilio)
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Twilio phone number for OTPs

### 🔹 Social Logins
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID (backend verification)
- `VITE_FACEBOOK_APP_ID` - Facebook app ID (served from backend to frontend)

### 🔹 Admin Configuration
- `ADMIN_MOBILE` - Fixed Super Admin mobile number

---

## 📋 **FRONTEND ENVIRONMENT VARIABLES** (Set in Frontend Hosting)

### 🔹 Social Logins (0 variables)
- All social login IDs are now served from backend

---

## 🎯 **CLIENT RESPONSIBILITY**

### ✅ **Backend Variables (15 total)**
Client needs to provide these to you for backend setup:
1. `JWT_SECRET`
2. `MONGODB_URI`
3. `RAZORPAY_KEY_ID`
4. `RAZORPAY_KEY_SECRET`
5. `EMAIL_USER`
6. `EMAIL_PASS`
7. `CLOUDINARY_CLOUD_NAME`
8. `CLOUDINARY_API_KEY`
9. `CLOUDINARY_API_SECRET`
10. `TWILIO_ACCOUNT_SID`
11. `TWILIO_AUTH_TOKEN`
12. `TWILIO_PHONE_NUMBER`
13. `VITE_GOOGLE_CLIENT_ID`
14. `VITE_FACEBOOK_APP_ID`
15. `ADMIN_MOBILE`

### ✅ **Frontend Variables (0 total)**
Client doesn't need to set any frontend environment variables

---

## 📝 **IMPORTANT NOTES**

1. **Single Twilio Account**: Only one Twilio account needed for both users and admin
2. **Google OAuth**: `VITE_GOOGLE_CLIENT_ID` is used in backend for token verification
3. **Facebook OAuth**: `VITE_FACEBOOK_APP_ID` is only used in frontend
4. **Port**: `PORT` is automatically set by Hostinger
5. **Security**: All sensitive data uses environment variables

## 🚀 **DEPLOYMENT FLOW**

1. **You**: Upload backend code to Hostinger
2. **Client**: Provides 15 backend environment variables
3. **You**: Set these variables in Hostinger backend environment
4. **Client**: Uploads frontend code (no environment variables needed)
5. **Result**: Application is ready for production! 🎉
