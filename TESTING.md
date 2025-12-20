# HR & Payroll Management System - Testing Guide

This guide provides instructions for setting up, running, and testing the HR & Payroll Management System.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [E2E Testing](#e2e-testing)
- [Test Credentials](#test-credentials)
- [Features Implemented](#features-implemented)

## Prerequisites

- **PHP**: >= 8.2
- **Composer**: Latest version
- **Node.js**: >= 18.x
- **npm**: >= 9.x
- **Database**: SQLite (default) or MySQL

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd HRandPayrollMS-BackEnd
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Configure your database in `.env` (SQLite is default):
   ```env
   DB_CONNECTION=sqlite
   # OR for MySQL:
   # DB_CONNECTION=mysql
   # DB_HOST=127.0.0.1
   # DB_PORT=3306
   # DB_DATABASE=hr_payroll_db
   # DB_USERNAME=root
   # DB_PASSWORD=
   ```

6. Set the APP_URL in `.env`:
   ```env
   APP_URL=http://localhost:8000
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd HRandPayrollMS-FrontEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure backend URL in `.env`:
   ```env
   VITE_REACT_APP_BACKEND_URL=http://localhost:8000
   ```

## Database Setup

1. Run migrations:
   ```bash
   cd HRandPayrollMS-BackEnd
   php artisan migrate
   ```

2. Seed the database with test data:
   ```bash
   php artisan db:seed --class=TestUserSeeder
   ```

3. (Optional) Seed with additional demo data:
   ```bash
   php artisan db:seed
   ```

## Running the Application

### Start Backend Server

```bash
cd HRandPayrollMS-BackEnd
php artisan serve
```

The backend will be available at `http://localhost:8000`

### Start Frontend Development Server

```bash
cd HRandPayrollMS-FrontEnd
npm run dev
```

The frontend will be available at `http://localhost:5173`

## E2E Testing

### Setup E2E Tests

E2E tests are already configured with Playwright. Ensure you have:

1. Installed frontend dependencies (includes Playwright)
2. Installed Playwright browsers:
   ```bash
   cd HRandPayrollMS-FrontEnd
   npx playwright install chromium
   ```

### Running E2E Tests

**Before running tests, ensure:**
- Backend server is running (`php artisan serve`)
- Database is seeded with test data (`php artisan db:seed --class=TestUserSeeder`)

**Run all tests:**
```bash
cd HRandPayrollMS-FrontEnd
npm test
```

**Run tests with UI:**
```bash
npm run test:ui
```

**Run tests in headed mode (see browser):**
```bash
npm run test:headed
```

**Debug tests:**
```bash
npm run test:debug
```

**View test report:**
```bash
npm run test:report
```

### Test Files

- `e2e/auth.spec.js` - Authentication flow tests (login, register, logout)
- `e2e/profile.spec.js` - Profile editing and photo upload tests
- `e2e/helpers.js` - Helper functions for tests

## Test Credentials

The following test accounts are created by the `TestUserSeeder`:

### Admin Account
- **Email:** admin@example.com
- **Password:** password
- **Role:** Administrator (role_id: 2)
- **Employee ID:** ADM-001

### Test Employee Account
- **Email:** test@example.com
- **Password:** password123
- **Role:** Employee (role_id: 1)
- **Employee ID:** EMP-001

### Additional Test Accounts
- employee@test.com / password123
- sadia@test.com / password123
- ahmed@test.com / password123
- fatima@test.com / password123

## Features Implemented

### ✅ Profile Photo Management

**Frontend:**
- ✅ File upload component with validation
- ✅ Image preview before upload
- ✅ Support for JPG, JPEG, PNG, WEBP formats
- ✅ 2MB file size limit
- ✅ Real-time profile picture updates

**Backend:**
- ✅ Secure file upload endpoint `/user/profile-image`
- ✅ Image validation (type, size)
- ✅ Automatic old image deletion
- ✅ Storage in `public/uploads/user_images/`
- ✅ Full URL generation with `asset()` helper
- ✅ `image_url` accessor on User model

**Database Integration:**
- ✅ Profile photos saved in `users.image` column
- ✅ Automatic URL generation via User model accessor
- ✅ All instances of user photos fetch from database
- ✅ Photos persist across page reloads and sessions

### ✅ Profile Editing

**Features:**
- ✅ Edit mode toggle
- ✅ Editable fields: Name, Phone, Email, Date of Birth, Blood Group, Emergency Contact, Address
- ✅ Non-editable fields: Employee ID, Department, Designation, Join Date
- ✅ Save and Cancel functionality
- ✅ Real-time validation
- ✅ localStorage sync after updates
- ✅ Redux state management

**Endpoints:**
- `PUT /user/profile` - Update own profile
- `POST /user/profile-image` - Upload profile photo
- `GET /user/profile` - Get current user profile

### ✅ Authentication & Authorization

**Features:**
- ✅ User registration
- ✅ Login with JWT tokens
- ✅ Logout functionality
- ✅ Role-based access control (Admin, Employee)
- ✅ Protected routes
- ✅ Session persistence
- ✅ Google OAuth integration

**Security:**
- ✅ Laravel Sanctum authentication
- ✅ Password hashing
- ✅ CSRF protection
- ✅ CORS configuration

### ✅ E2E Testing

**Test Coverage:**
- ✅ User login flow
- ✅ User registration
- ✅ Logout functionality
- ✅ Protected route access
- ✅ Session persistence
- ✅ Profile page display
- ✅ Profile editing
- ✅ Profile photo upload
- ✅ Form validation
- ✅ Error handling

### ✅ File Permissions

All necessary edit permissions are configured:
- ✅ Users can update their own profiles without admin permission
- ✅ Users can upload their own profile photos
- ✅ `auth:sanctum` middleware protects all user endpoints
- ✅ Permission middleware commented out for user self-service

## Project Structure

```
HR-Payroll-MS/
├── HRandPayrollMS-BackEnd/          # Laravel 12 Backend
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── Auth/
│   │   │   │   └── AuthController.php
│   │   │   └── User/
│   │   │       └── UserController.php
│   │   └── Models/
│   │       └── User/
│   │           └── User.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │       └── TestUserSeeder.php
│   ├── public/
│   │   └── uploads/
│   │       └── user_images/         # Profile photos stored here
│   └── routes/
│       ├── api.php
│       ├── auth.php
│       └── user.php
│
└── HRandPayrollMS-FrontEnd/         # React 19 Frontend
    ├── e2e/                          # E2E test files
    │   ├── auth.spec.js
    │   ├── profile.spec.js
    │   └── helpers.js
    ├── src/
    │   ├── components/
    │   │   └── hooks/
    │   │       ├── useCurrentUser.js
    │   │       └── useCurrentAdminUser.js
    │   ├── features/
    │   │   └── auth/
    │   │       └── authSlice.js      # Redux auth + photo upload mutations
    │   └── pages/
    │       └── employee/
    │           └── EmployeeProfile.jsx
    └── playwright.config.js          # Playwright configuration
```

## API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /auth/refresh` - Refresh access token

### User Profile
- `GET /user/profile` - Get current user
- `PUT /user/profile` - Update current user
- `POST /user/profile-image` - Upload profile photo

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
php artisan serve --port=8001
```

**Permission denied for storage:**
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

**Database not found:**
```bash
touch database/database.sqlite
php artisan migrate:fresh --seed
```

### Frontend Issues

**Port already in use:**
Update `vite.config.js`:
```js
export default defineConfig({
  server: {
    port: 5174
  }
})
```

**CORS errors:**
Ensure `.env` has correct backend URL and CORS is configured in `config/cors.php`

### E2E Test Issues

**Tests failing:**
1. Ensure backend is running
2. Ensure database is seeded
3. Check test credentials match seeded data
4. Clear browser cache: `npx playwright open --clear-storage`

**Browsers not installed:**
```bash
npx playwright install
```

## Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Playwright Documentation](https://playwright.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)

## Support

For issues or questions:
1. Check the console logs (frontend and backend)
2. Review the test output for specific errors
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

## License

This project is proprietary software.
