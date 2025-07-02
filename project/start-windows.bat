@echo off
echo Starting VCube QR Attendance System...
echo.

echo Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install server dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Creating environment files if they don't exist...

if not exist .env (
    echo VITE_API_URL=http://localhost:5000/api > .env
    echo Created .env file
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
    echo Created server\.env file
)

echo.
echo Starting the application...
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:5000
echo Admin credentials: vcubemulticloud@gmail.com / Vcube$4321
echo.
echo Press Ctrl+C to stop the servers
echo.

call npm run dev