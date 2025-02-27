@echo off
setlocal enabledelayedexpansion

:loop
echo Finding process using port 5001...

set PID=
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5001') do (
    set PID=%%a
)

if "!PID!"=="" (
    echo No process found using port 5001.
) else (
    echo Killing process with PID !PID!...
    taskkill /PID !PID! /F
    echo Process !PID! killed successfully.
    timeout /t 2 >nul
    goto loop
)

echo Restarting server...
cmd /k "npm run dev"
