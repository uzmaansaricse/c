# Email OTP Setup Guide

## Problem Fixed
The email OTP functionality for user login was not working properly. The following issues have been resolved:

1. **User Model Schema**: Added missing `email_otp` and `mobile_otp` to the loginMethod enum
2. **User Creation Logic**: Fixed the logic to properly set `loginMethod` based on identifier type
3. **Email Configuration**: Added better error handling and logging for email sending
4. **Environment Variables**: Added verification for email configuration

## Setup Instructions

### 1. Environment Variables
Make sure you have the following environment variables set in your `.env` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Gmail App Password Setup
For Gmail, you need to use an App Password instead of your regular password:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for your application
4. Use this App Password as `EMAIL_PASS`

### 3. Fix Database Indexes (if needed)
If you encounter duplicate key errors, run this script to fix database indexes:

```bash
npm run fix-db
```

This will:
- Check for problematic unique indexes on mobile/email fields
- Remove any unique constraints that shouldn't exist
- Fix the database schema issues

### 4. Test Email Configuration
Run the test script to verify your email configuration:

```bash
npm run test-email
```

This will:
- Check if environment variables are set
- Verify the email transporter configuration
- Send a test email to verify everything works

### 5. API Endpoints

#### Test Email Configuration
```
GET /api/auth/test-email-config
```

#### Send OTP
```
POST /api/auth/send-otp
Body: { "identifier": "user@example.com" }
```

#### Verify OTP
```
POST /api/auth/verify-otp
Body: { "identifier": "user@example.com", "otp": "123456" }
```

## Changes Made

### 1. User Model (`User Model & OTP Model.js`)
- Added `email_otp` and `mobile_otp` to loginMethod enum

### 2. Auth Controller (`authController.js`)
- Fixed user creation logic to properly set loginMethod
- Added better error handling for email sending and user creation
- Added detailed logging for debugging
- Added email configuration verification
- Added test email endpoint
- Added duplicate key error handling

### 3. Auth Routes (`authRoutes.js`)
- Added test email configuration endpoint

### 4. Test Script (`test-email.js`)
- Created standalone test script for email configuration

### 5. Database Fix Script (`fix-db-index.js`)
- Created script to fix database index issues

## Troubleshooting

### Email Not Sending
1. Check if `EMAIL_USER` and `EMAIL_PASS` are set correctly
2. Verify Gmail App Password is correct
3. Check if 2-Factor Authentication is enabled on Gmail
4. Check server logs for detailed error messages

### Common Gmail Issues
- **Invalid credentials**: Use App Password instead of regular password
- **Less secure app access**: Enable 2-Factor Authentication and use App Password
- **Rate limiting**: Gmail has daily sending limits

### Debugging
The code now includes detailed logging:
- Email configuration status
- OTP sending attempts
- Detailed error messages
- Environment variable status

## Testing
1. Run `npm run fix-db` to fix any database index issues
2. Run `npm run test-email` to test email configuration
3. Run `npm run test-otp` to test OTP with multiple email addresses
4. Try sending OTP to any email address (Gmail, Yahoo, Hotmail, etc.)
5. Check server logs for any errors
6. Verify OTP is received in email inbox

## Notes
- **Any email address can be used for login** - nodemailer works with any email provider
- Email OTP will be sent to all users with email addresses
- SMS OTP will be sent to users with mobile numbers
- Both can be sent simultaneously if user has both email and mobile
- Admin OTP uses separate Twilio configuration
- **Production Ready**: nodemailer is free and works in production mode
