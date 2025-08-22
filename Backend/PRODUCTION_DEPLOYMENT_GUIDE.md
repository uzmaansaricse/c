# 🚀 Production Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Environment Variables Required

Your client needs to provide these environment variables on Hostinger:

#### 🔹 Core Configuration
- `PORT` - Server port (Hostinger will set this automatically)
- `JWT_SECRET` - Secret key for JWT tokens (generate a strong random string)

#### 🔹 Database Configuration
- `MONGODB_URI` - MongoDB database connection string

#### 🔹 Payment Gateway (Razorpay)
- `RAZORPAY_KEY_ID` - Razorpay public key
- `RAZORPAY_KEY_SECRET` - Razorpay secret key

#### 🔹 Email Service (Gmail)
- `EMAIL_USER` - Gmail address for sending notifications
- `EMAIL_PASS` - 16-digit app password for the Gmail account

#### 🔹 Cloudinary (Image & Video Storage)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

#### 🔹 OTP Services (Twilio)
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Twilio phone number for OTPs

#### 🔹 Social Logins
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `VITE_FACEBOOK_APP_ID` - Facebook app ID

#### 🔹 Admin Configuration
- `ADMIN_MOBILE` - Fixed Super Admin mobile number

## 🛠️ Deployment Steps

### 1. Backend Deployment (Hostinger)

1. **Upload Backend Files**
   - Upload all files from `Backend/` folder to your hosting directory
   - Ensure `main.js` is in the root of your hosting directory

2. **Set Environment Variables**
   - In Hostinger control panel, go to "Environment Variables"
   - Add all the variables listed above
   - Make sure to use the exact variable names (case-sensitive)

3. **Install Dependencies**
   - Run: `npm install` in your hosting directory
   - This will install all packages listed in `package.json`

4. **Start the Application**
   - Hostinger will automatically start your Node.js application
   - The app will run on the port provided by Hostinger

### 2. Frontend Deployment

1. **Upload Frontend Files**
   - Upload all files from `forntendbook/` folder to your web hosting directory
   - Ensure `index.html` is accessible as the main page

2. **Update CORS Settings** (if needed)
   - If your frontend and backend are on different domains, update CORS in `main.js`

## 🔧 Configuration Notes

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password (16 characters)
3. Use this App Password as `EMAIL_PASS`

### Twilio Setup
- Single Twilio account is used for both users and admin OTPs
- Cost-effective solution for production deployment

### Database Setup
- Ensure your MongoDB database is accessible from your hosting provider
- Use MongoDB Atlas for cloud-hosted database

## 🧪 Testing After Deployment

### 1. Test Email OTP
```bash
# Test email configuration
curl -X GET https://yourdomain.com/api/auth/test-email-config
```

### 2. Test User Registration
- Try registering with email OTP
- Try registering with mobile OTP
- Test social login (Google/Facebook)

### 3. Test Payment Flow
- Test Razorpay integration
- Verify order creation and payment processing

### 4. Test File Uploads
- Test book image uploads to Cloudinary
- Test video/image content uploads

## 🚨 Important Notes

1. **Security**: All sensitive data is now using environment variables
2. **Port**: The application now uses `process.env.PORT` for production
3. **URLs**: All hardcoded localhost URLs have been fixed to use relative paths
4. **Validation**: The app will fail to start if any required environment variables are missing

## 📞 Support

If you encounter any issues:
1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Test the email configuration using the test endpoint
4. Ensure your MongoDB connection string is correct

## 🔄 Updates Made for Production

1. ✅ Fixed hardcoded port number to use `process.env.PORT`
2. ✅ Added environment variable validation
3. ✅ Fixed hardcoded localhost URLs in frontend
4. ✅ Updated console logging for production
5. ✅ Maintained all existing functionality

Your application is now ready for production deployment! 🎉
