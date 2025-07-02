# Running VCube QR Attendance System on Windows VM

## Prerequisites

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS version for Windows

2. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/download/win

## Setup Instructions

### 1. Extract and Navigate to Project
```powershell
# If you have the project as a ZIP file, extract it
# Navigate to the project directory
cd path\to\student-qr-attendance-system
```

### 2. Install Dependencies
```powershell
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Configuration

Create `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Create `server\.env` file:
```env
# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Admin (Default credentials)
ADMIN_EMAIL=vcubemulticloud@gmail.com
ADMIN_PASSWORD=Vcube$4321
```

### 4. Start the Application

**Option 1: Start both servers together (Recommended)**
```powershell
npm run dev
```

**Option 2: Start servers separately**

Terminal 1 (Backend):
```powershell
cd server
npm run dev
```

Terminal 2 (Frontend):
```powershell
npm run dev:client
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Login**: vcubemulticloud@gmail.com / Vcube$4321

## Windows-Specific Commands

### Using PowerShell
```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# List running processes on ports
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Kill process by PID (if needed)
taskkill /PID <process_id> /F
```

### Using Command Prompt
```cmd
# Navigate to project
cd C:\path\to\your\project

# Install dependencies
npm install

# Start application
npm run dev
```

## Firewall Configuration

If you need to access the application from other machines:

1. **Windows Firewall**:
   - Open Windows Defender Firewall
   - Click "Allow an app or feature through Windows Defender Firewall"
   - Click "Change Settings" → "Allow another app"
   - Browse and select Node.js executable
   - Allow for both Private and Public networks

2. **Port Configuration**:
   - Ensure ports 5000 (backend) and 5173 (frontend) are open
   - You can also configure custom ports in the environment files

## Troubleshooting

### Common Issues:

1. **Port Already in Use**:
   ```powershell
   # Find process using port 5000
   netstat -ano | findstr :5000
   # Kill the process
   taskkill /PID <PID> /F
   ```

2. **Permission Issues**:
   - Run PowerShell as Administrator
   - Or use Command Prompt as Administrator

3. **Node.js Not Found**:
   - Restart terminal after Node.js installation
   - Add Node.js to PATH manually if needed

4. **Database Issues**:
   - The SQLite database will be created automatically
   - Located at: `server\database\attendance.db`

### Network Access from Other Machines:

If you want to access from other devices on the network:

1. **Find your VM's IP address**:
   ```powershell
   ipconfig
   ```

2. **Update frontend configuration**:
   - Edit `.env` file
   - Change `VITE_API_URL=http://YOUR_VM_IP:5000/api`

3. **Start with host binding**:
   ```powershell
   # Frontend
   npm run dev:client -- --host 0.0.0.0

   # Backend (modify server.js if needed)
   # Add: app.listen(PORT, '0.0.0.0', () => {...})
   ```

## Production Deployment on Windows

For production deployment:

1. **Build the application**:
   ```powershell
   npm run build
   ```

2. **Start production server**:
   ```powershell
   npm start
   ```

3. **Use PM2 for process management** (optional):
   ```powershell
   npm install -g pm2
   pm2 start server\server.js --name "vcube-attendance"
   pm2 startup
   pm2 save
   ```

## Default Admin Credentials

- **Email**: vcubemulticloud@gmail.com
- **Password**: Vcube$4321

## Features Available

- ✅ Student Registration with QR Code Generation
- ✅ QR Code Scanning for Attendance
- ✅ Admin Dashboard with Analytics
- ✅ Student Management
- ✅ Attendance Tracking and Reports
- ✅ Data Export (CSV)

## Support

If you encounter any issues:
1. Check the console logs in both terminals
2. Verify all dependencies are installed
3. Ensure ports 5000 and 5173 are available
4. Check Windows Firewall settings if accessing from network