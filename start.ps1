param(
    [ValidateSet("default", "go", "web", "android", "ios")]
    [string]$Target = "default",

    [int]$Port = 8081,

    [switch]$ClearCache,
    [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Write-Ok {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Write-Fail {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Test-Command {
    param([string]$Name)
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Invoke-Checked {
    param(
        [string]$Command,
        [string[]]$Arguments,
        [string]$FailureMessage
    )

    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw $FailureMessage
    }
}

function Test-PortAvailable {
    param([int]$Port)

    $Connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return -not $Connection
}

function Get-FreePort {
    param([int]$StartPort)

    for ($Candidate = $StartPort; $Candidate -le ($StartPort + 20); $Candidate++) {
        if (Test-PortAvailable $Candidate) {
            return $Candidate
        }
    }

    throw "No free port was found between $StartPort and $($StartPort + 20). Close old Expo/Node terminals and try again."
}

try {
    $ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
    Set-Location $ProjectRoot

    Write-Step "Checking project folder"
    if (-not (Test-Path "package.json")) {
        throw "package.json was not found. Run this script from the project root or keep start.ps1 in the root folder."
    }

    if (-not (Test-Path "app.json")) {
        Write-Warn "app.json was not found. This does not look like a complete Expo project."
    }

    Write-Ok "Project root: $ProjectRoot"

    Write-Step "Checking required tools"
    if (-not (Test-Command "node")) {
        throw "Node.js is not installed or not available in PATH. Install Node.js LTS, reopen PowerShell, then run .\start.ps1 again."
    }

    if (-not (Test-Command "npm")) {
        throw "npm is not installed or not available in PATH. Reinstall Node.js LTS, reopen PowerShell, then run .\start.ps1 again."
    }

    $NodeVersion = (& node --version)
    $NpmVersion = (& npm --version)
    Write-Ok "Node: $NodeVersion"
    Write-Ok "npm: $NpmVersion"

    if (-not $SkipInstall) {
        $NeedsInstall = -not (Test-Path "node_modules")

        if ($NeedsInstall) {
            Write-Step "Installing dependencies"

            if (Test-Path "package-lock.json") {
                try {
                    Invoke-Checked "npm" @("ci") "npm ci failed."
                    Write-Ok "Dependencies installed with npm ci"
                }
                catch {
                    Write-Warn "npm ci failed. Trying npm install instead."
                    Invoke-Checked "npm" @("install") "npm install failed. Check your internet connection and package-lock.json."
                    Write-Ok "Dependencies installed with npm install"
                }
            }
            else {
                Invoke-Checked "npm" @("install") "npm install failed. Check your internet connection and package.json."
                Write-Ok "Dependencies installed"
            }
        }
        else {
            Write-Ok "node_modules already exists"
        }
    }
    else {
        Write-Warn "Skipping dependency install because -SkipInstall was provided"
    }

    Write-Step "Checking Expo"
    if (-not (Test-Path "node_modules\.bin\expo.cmd")) {
        Write-Warn "Local Expo binary was not found. npm may not have installed correctly; npx will still try to run Expo."
    }

    $SelectedPort = Get-FreePort $Port
    if ($SelectedPort -ne $Port) {
        Write-Warn "Port $Port is busy. Using port $SelectedPort instead."
    }
    else {
        Write-Ok "Port $SelectedPort is available"
    }

    $ExpoArgs = @("expo", "start", "--port", "$SelectedPort")

    switch ($Target) {
        "go" { $ExpoArgs += "--go" }
        "web" { $ExpoArgs += "--web" }
        "android" { $ExpoArgs += "--android" }
        "ios" { $ExpoArgs += "--ios" }
    }

    if ($ClearCache) {
        $ExpoArgs += "--clear"
    }

    Write-Step "Starting Expo"
    Write-Host "Command: npx $($ExpoArgs -join ' ')" -ForegroundColor DarkGray
    Write-Host ""
    Invoke-Checked "npx" $ExpoArgs "Expo failed to start. Try running .\start.ps1 -ClearCache, or verify that your emulator/device setup is ready."
}
catch {
    Write-Host ""
    Write-Fail $_.Exception.Message
    Write-Host ""
    Write-Host "Useful retries:" -ForegroundColor Yellow
    Write-Host "  .\start.ps1 -ClearCache"
    Write-Host "  .\start.ps1 -Target web"
    Write-Host "  .\start.ps1 -Target go"
    Write-Host "  .\start.ps1 -Port 8082"
    Write-Host "  .\start.ps1 -SkipInstall"
    exit 1
}
