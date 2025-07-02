@echo off
echo 🔍 VCube QR Attendance System - Windows Debug Script
echo ================================================
echo.

echo 📋 Checking system requirements...
echo.

echo 🔧 Node.js version:
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo 💡 Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo 📦 NPM version:
npm --version

echo.
echo 🌐 Checking network connectivity...
ping -n 1 localhost > nul
if %errorlevel% neq 0 (
    echo ❌ localhost is not accessible
) else (
    echo ✅ localhost is accessible
)

echo.
echo 🔍 Checking if ports are in use...
echo 📡 Port 5000 (Backend):
netstat -ano | findstr :5000
if %errorlevel% neq 0 (
    echo ✅ Port 5000 is available
) else (
    echo ⚠️ Port 5000 is in use
)

echo.
echo 📡 Port 5173 (Frontend):
netstat -ano | findstr :5173
if %errorlevel% neq 0 (
    echo ✅ Port 5173 is available
) else (
    echo ⚠️ Port 5173 is in use
)

echo.
echo 📁 Checking project structure...
if exist package.json (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found - are you in the right directory?
)

if exist server\package.json (
    echo ✅ server\package.json found
) else (
    echo ❌ server\package.json not found
)

if exist .env (
    echo ✅ .env file found
) else (
    echo ⚠️ .env file not found - will be created
)

if exist server\.env (
    echo ✅ server\.env file found
) else (
    echo ⚠️ server\.env file not found - will be created
)

echo.
echo 🔧 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo 📝 Creating environment files...
if not exist .env (
    echo VITE_API_URL=http://localhost:5000/api > .env
    echo ✅ Created .env file
)

if not exist server\.env (
    (
        echo # JWT
        echo JWT_SECRET=your-super-secret-jwt-key-here
        echo JWT_EXPIRES_IN=7d
        echo.
        echo # Server
        echo PORT=5000
        echo NODE_ENV=development
        echo.
        echo # Admin ^(Default credentials^)
        echo ADMIN_EMAIL=vcubemulticloud@gmail.com
        echo ADMIN_PASSWORD=Vcube$4321
    ) > server\.env
    echo ✅ Created server\.env file
)

echo.
echo 🧪 Testing connection...
timeout /t 2 > nul
call npm run test-connection

echo.
echo 🚀 Starting application...
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:5000
echo 👤 Admin: vcubemulticloud@gmail.com / Vcube$4321
echo.
echo Press Ctrl+C to stop the servers
echo.

call npm run dev