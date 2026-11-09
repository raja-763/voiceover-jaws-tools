@echo off
:: install.bat — VoiceOverTools for JAWS installer
:: Run this file as a regular user (no admin needed).
:: It copies VoiceOverTools.jss and VoiceOverTools.jkm to your
:: JAWS user-settings folder and compiles the script.

setlocal EnableDelayedExpansion

echo.
echo ===================================================
echo   VoiceOverTools for JAWS — Windows Installer
echo ===================================================
echo.

:: ----------------------------------------------------------------
:: 1. Find the newest JAWS version folder in AppData
:: ----------------------------------------------------------------
set "JAWS_ROOT=%APPDATA%\Freedom Scientific\JAWS"
set "JAWS_ENU="
set "LATEST_VER=0"

if not exist "%JAWS_ROOT%" (
    echo ERROR: JAWS settings folder not found at:
    echo   %JAWS_ROOT%
    echo Please install JAWS before running this script.
    pause
    exit /b 1
)

for /d %%V in ("%JAWS_ROOT%\*") do (
    set "VER=%%~nxV"
    if !VER! GTR !LATEST_VER! (
        set "LATEST_VER=!VER!"
        set "JAWS_ENU=%%V\Settings\ENU"
    )
)

if "%JAWS_ENU%"=="" (
    echo ERROR: No versioned JAWS folder found inside:
    echo   %JAWS_ROOT%
    pause
    exit /b 1
)

echo Detected JAWS version : %LATEST_VER%
echo Destination           : %JAWS_ENU%
echo.

if not exist "%JAWS_ENU%" (
    echo ERROR: Settings\ENU folder does not exist:
    echo   %JAWS_ENU%
    echo Check your JAWS installation.
    pause
    exit /b 1
)

:: ----------------------------------------------------------------
:: 2. Copy script files
:: ----------------------------------------------------------------
set "SRC=%~dp0"

echo Copying VoiceOverTools.jss ...
copy /Y "%SRC%VoiceOverTools.jss" "%JAWS_ENU%\" > nul
if errorlevel 1 (
    echo ERROR: Could not copy VoiceOverTools.jss
    pause
    exit /b 1
)

echo Copying VoiceOverTools.jkm ...
copy /Y "%SRC%VoiceOverTools.jkm" "%JAWS_ENU%\" > nul
if errorlevel 1 (
    echo ERROR: Could not copy VoiceOverTools.jkm
    pause
    exit /b 1
)

echo.
echo Files copied successfully.
echo.

:: ----------------------------------------------------------------
:: 3. Compile the script with JAWS Script Manager (SManager.exe)
:: ----------------------------------------------------------------
set "JAWS_BIN=C:\Program Files\Freedom Scientific\JAWS\%LATEST_VER%"
if not exist "%JAWS_BIN%" (
    set "JAWS_BIN=C:\Program Files (x86)\Freedom Scientific\JAWS\%LATEST_VER%"
)

if exist "%JAWS_BIN%\SManager.exe" (
    echo Compiling VoiceOverTools.jss ...
    "%JAWS_BIN%\SManager.exe" /compile "%JAWS_ENU%\VoiceOverTools.jss"
    echo Compilation done.
) else (
    echo NOTE: JAWS Script Manager not found at the expected path.
    echo The script will compile automatically the first time JAWS loads it.
)

echo.
echo ===================================================
echo   Installation complete!
echo ===================================================
echo.
echo Please restart JAWS (or press Insert+F2 ^> Restart JAWS).
echo.
echo New keyboard shortcuts:
echo   Insert+Ctrl+I      — Item Chooser
echo   Insert+NumPad 5    — Route PC cursor to JAWS position (VoiceOver Router)
echo   Insert+Shift+Num5  — Route JAWS cursor to PC position
echo.
pause
endlocal
