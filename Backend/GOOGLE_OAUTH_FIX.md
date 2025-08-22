# 🔧 Google OAuth Production Fix Guide

## 🚨 **ISSUE IDENTIFIED**
Google OAuth localhost पर work कर रहा है लेकिन live project पर error आ रहा है।

## 🔍 **ROOT CAUSE**
1. **Google Console Configuration**: Live domain not added to authorized origins
2. **OAuth Client ID**: Production domain not configured
3. **CORS Issues**: Cross-origin requests not properly handled

## ✅ **SOLUTION STEPS**

### **Step 1: Google Console Configuration**

1. **Google Cloud Console पर जाएं**: https://console.cloud.google.com/
2. **Your Project Select करें**
3. **APIs & Services → Credentials** पर जाएं
4. **OAuth 2.0 Client IDs** में जाएं
5. **Your Client ID Edit करें**

### **Step 2: Authorized JavaScript Origins Add करें**

```
✅ ADD THESE URLs:
- http://localhost:9000 (for development)
- https://aravalipublication.com (your live domain)
- https://www.aravalipublication.com (with www)
```

### **Step 3: Authorized Redirect URIs Add करें**

```
✅ ADD THESE URLs:
- http://localhost:9000/signup-login.html
- https://aravalipublication.com/signup-login.html
- https://www.aravalipublication.com/signup-login.html
```

### **Step 4: Backend CORS Configuration**

Ensure your backend allows the live domain:

```javascript
const allowedOrigins = [
  'http://localhost:9000',
  'https://aravalipublication.com',
  'https://www.aravalipublication.com'
];
```

### **Step 5: Environment Variable Check**

Ensure `VITE_GOOGLE_CLIENT_ID` is set correctly in your backend environment variables.

## 🧪 **TESTING**

### **Test 1: Console Logs Check**
1. Browser में Developer Tools खोलें
2. Console tab में जाएं
3. Google login try करें
4. Error messages check करें

### **Test 2: Network Tab Check**
1. Network tab में जाएं
2. Google login try करें
3. Failed requests check करें

### **Test 3: Backend API Test**
```bash
curl -X GET https://aravalipublication.com/api/auth/social-login-config
```

## 🔧 **CODE FIXES APPLIED**

### **Frontend Fixes:**
1. ✅ Removed hardcoded `data-login_uri`
2. ✅ Added proper error handling
3. ✅ Added console logging for debugging
4. ✅ Added `auto_select: false` and `cancel_on_tap_outside: true`

### **Backend Fixes:**
1. ✅ Dynamic Google Client ID from environment
2. ✅ Proper CORS configuration
3. ✅ Error handling for social login

## 📞 **SUPPORT**

If issues persist:
1. Check Google Console configuration
2. Verify environment variables
3. Check browser console for errors
4. Test backend API endpoints

## 🎯 **EXPECTED RESULT**

After applying these fixes:
- ✅ Google login should work on live domain
- ✅ No more "Something went wrong" errors
- ✅ Proper error messages if issues occur
- ✅ Console logging for debugging
