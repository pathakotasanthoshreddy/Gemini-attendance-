# VCube Software Solutions - DevOps with AI Tools Workshop

A comprehensive workshop registration and QR code-based attendance tracking system for VCube Software Solutions' DevOps with AI Tools workshop.

## Workshop Details

**Free Saturday Workshop – DevOps with AI Tools**

- **Speaker**: Mr. Krishna Reddy (Multi-Cloud & DevSecOps Trainer)
- **Organization**: VCube Software Solutions
- **Date**: 05th July, 2025 (Saturday)
- **Mode**: Offline Only
- **Fee**: 100% Free

## Features

- **Workshop Registration**: Easy registration with automatic QR code generation
- **QR Code Scanning**: Fast attendance marking using QR codes
- **Admin Dashboard**: Complete management interface with analytics
- **Real-time Tracking**: Instant attendance updates and notifications
- **Data Export**: CSV export for participants and attendance records
- **Responsive Design**: Works on all devices

## Workshop Topics

✅ Master kubectl for Kubernetes automation
✅ Boost productivity with GitHub Copilot
✅ Discover the power of Azure AI Foundry
✅ Work with modern platforms and tools for DevOps excellence

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Hook Form for form handling
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- QR code generation
- CSV export functionality
- Rate limiting and security middleware

## Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── api/               # API service functions
│   └── ...
├── server/                # Backend Node.js application
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── ...
└── ...
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install
```

### 2. Environment Setup

Create `.env` files:

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (server/.env):**
```env
MONGODB_URI=mongodb://localhost:27017/vcube-workshop
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
ADMIN_EMAIL=admin@vcube.com
ADMIN_PASSWORD=admin123
```

### 3. Database Setup

Make sure MongoDB is running:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas cloud service
```

### 4. Start the Application

**Development (both servers):**
```bash
npm run dev
```

**Or start individually:**
```bash
# Frontend (from root)
npm run dev:client

# Backend (from root)
npm run dev:server
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Usage Guide

### 1. Admin Setup
1. Visit `/login` and click "Set up here"
2. Create the first admin account
3. Login to access the admin dashboard

### 2. Workshop Registration
1. Go to `/register`
2. Fill in participant details
3. Download the generated QR code

### 3. Attendance Scanning
1. Visit `/scanner`
2. Allow camera access
3. Scan participant QR codes to mark attendance

### 4. Admin Features
- **Dashboard**: View attendance statistics and trends
- **Participants**: Manage participant records
- **Attendance**: View and export attendance data

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/setup` - Create first admin

### Participants
- `POST /api/students/register` - Register new participant
- `GET /api/students` - Get all participants (admin)
- `GET /api/students/:id` - Get participant by ID
- `PUT /api/students/:id` - Update participant
- `DELETE /api/students/:id` - Delete participant

### Attendance
- `POST /api/attendance/mark` - Mark attendance
- `GET /api/attendance` - Get attendance records (admin)
- `GET /api/attendance/summary` - Get attendance summary

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/export/students` - Export participants CSV
- `GET /api/admin/export/attendance` - Export attendance CSV

## About VCube Software Solutions

VCube Software Solutions is a leading provider of technology training and solutions, specializing in cloud technologies, DevOps, and AI integration. Our mission is to empower professionals with cutting-edge skills for the modern tech landscape.

## Contact

For more information about VCube Software Solutions and our training programs, please visit our website or contact us directly.

## License

This project is licensed under the MIT License.