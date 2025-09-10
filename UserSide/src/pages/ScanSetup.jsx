import { useState } from "react";
import { Box, Typography, TextField, Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

// Define scanModes locally since the import might be missing
const scanModes = {
  basic: {
    nmap: "-T4 -F",
    rustscan: "--ulimit 5000 -t 2000 -- -sC -sV",
    gobuster: "dir -u https://{target}/ -w /usr/share/wordlists/dirb/common.txt -t 50",
    whatweb: "--color=never --aggression 1",
    nikto: "-h {target} -Tuning 1",
    testssl: "--quiet --color 0",
    nuclei: "-t cves/ -severity low,medium,high -rate-limit 100",
    subdomain: "-d {target} -t 50"
  },
  advanced: {
    nmap: "-T4 -A -v -p-",
    rustscan: "--ulimit 5000 -t 2000 -- -A -sV -sC -O",
    gobuster: "dir -u https://{target}/ -w /usr/share/wordlists/dirb/big.txt -t 100 -x php,html,js,txt",
    whatweb: "--color=never --aggression 3",
    nikto: "-h {target} -Tuning 1234567890ac",
    testssl: "--full --color 0",
    nuclei: "-t exposures/apis/ -t vulnerabilities/ -severity low,medium,high,critical -rate-limit 50",
    subdomain: "-d {target} -t 100 -recursive"
  }
};

function ScanSetup() {
  const [target, setTarget] = useState("");
  const [mode, setMode] = useState("basic");
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const runAllScans = async () => {
    setIsScanning(true);
    const scanIds = {};
    const errors = [];
    
    try {
      // Run Nmap
      try {
        const nmapResult = await api.runNmapScan(target, scanModes[mode].nmap);
        if (nmapResult.scan_id) {
          scanIds.nmap = nmapResult.scan_id;
        } else {
          errors.push(`Nmap: ${nmapResult.error || 'Unknown error'}`);
        }
      } catch (error) {
        errors.push(`Nmap: ${error.message}`);
      }
      
      // Run RustScan
      try {
        const rustScanResult = await api.runRustScan(target, scanModes[mode].rustscan);
        if (rustScanResult.scan_id) {
          scanIds.rustscan = rustScanResult.scan_id;
        } else {
          errors.push(`RustScan: ${rustScanResult.error || 'Unknown error'}`);
        }
      } catch (error) {
        errors.push(`RustScan: ${error.message}`);
      }
      
      // Run Gobuster
      try {
        const gobusterOptions = scanModes[mode].gobuster.replace('{target}', target);
        const gobusterResult = await api.runGobusterScan(target, gobusterOptions);
        if (gobusterResult.scan_id) {
          scanIds.gobuster = gobusterResult.scan_id;
        } else {
          errors.push(`Gobuster: ${gobusterResult.error || 'Unknown error'}`);
        }
      } catch (error) {
        errors.push(`Gobuster: ${error.message}`);
      }
      
      // Run WhatWeb
      try {
        const whatwebResult = await api.runWhatWebScan(target, scanModes[mode].whatweb);
        if (whatwebResult.scan_id) {
          scanIds.whatweb = whatwebResult.scan_id;
        } else {
          errors.push(`WhatWeb: ${whatwebResult.error || 'Unknown error'}`);
        }
      } catch (error) {
        errors.push(`WhatWeb: ${error.message}`);
      }
      
      // Run Nikto
      try {
        const niktoOptions = scanModes[mode].nikto.replace('{target}', target);
        const niktoResult = await api.runNiktoScan(target, niktoOptions);
        if (niktoResult.scan_id) {
          scanIds.nikto = niktoResult.scan_id;
        } else {
          errors.push(`Nikto: ${niktoResult.error || 'Unknown error'}`);
        }
      } catch (error) {
        errors.push(`Nikto: ${error.message}`);
      }
      
      // Run TestSSL
      try {
        const testsslResult = await api.runTestSSLScan(target, scanModes[mode].testssl);
        if (testsslResult.scan_id) {
          scanIds.testssl = testsslResult.scan_id;
        } else {
          errors.push(`TestSSL: ${testsslResult.error || 'Unknown error'}`);
        }
      } catch (error) {
        errors.push(`TestSSL: ${error.message}`);
      }
      
      // Run Nuclei
      try {
        const nucleiResult = await api.runNucleiScan(target, scanModes[mode].nuclei);
        if (nucleiResult.scan_id) {
          scanIds.nuclei = nucleiResult.scan_id;
        } else {
          errors.push(`Nuclei: ${nucleiResult.error || 'Unknown error'}`);
        }
      } catch (error) {
        errors.push(`Nuclei: ${error.message}`);
      }
      
      // Run Subdomain Enumeration
      try {
        const subdomainOptions = scanModes[mode].subdomain.replace('{target}', target);
        const subdomainResult = await api.runSubdomainScan(target, subdomainOptions);
        if (subdomainResult.scan_id) {
          scanIds.subdomain = subdomainResult.scan_id;
        } else {
          errors.push(`Subdomain Enum: ${subdomainResult.error || 'Unknown error'}`);
        }
      } catch (error) {
        errors.push(`Subdomain Enum: ${error.message}`);
      }
      
      // Store scan IDs for later retrieval
      if (Object.keys(scanIds).length > 0) {
        localStorage.setItem('currentScanIds', JSON.stringify(scanIds));
      }
      
      if (errors.length > 0) {
        alert(`Some scans failed:\n${errors.join('\n')}`);
      }
      
      // Redirect to analysis page
      navigate("/analysis");
    } catch (error) {
      alert(`Scan failed: ${error.message}`);
    } finally {
      setIsScanning(false);
    }
  };

  const handleStart = () => {
    if (!target) return alert("Enter a target first!");
    
    // Basic validation for target format
    const targetPattern = /^[a-zA-Z0-9.-]+$/;
    if (!targetPattern.test(target)) {
      return alert("Please enter a valid target (IP address or domain name)");
    }
    
    if (mode === "custom") {
      navigate("/nmap");
    } else {
      runAllScans();
    }
  };

  return (
    <Box sx={{ color: "#ff8a8a", maxWidth: 600, mx: "auto", textAlign: "center", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#fff" }}>Start New Scan</Typography>
      
      <TextField 
        fullWidth 
        label="Target (IP / Domain)" 
        variant="outlined" 
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        sx={{ 
          input: { color: "#fff" }, 
          mb: 3,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ff8a8a",
            },
            "&:hover fieldset": {
              borderColor: "#ff3838",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ff3838",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#ff8a8a",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#ff3838",
          }
        }}
      />

      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(e, v) => v && setMode(v)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="basic" sx={{ color: mode === "basic" ? "#fff" : "#ff8a8a", bgcolor: mode === "basic" ? "#ff3838" : "transparent" }}>
          Basic
        </ToggleButton>
        <ToggleButton value="advanced" sx={{ color: mode === "advanced" ? "#fff" : "#ff8a8a", bgcolor: mode === "advanced" ? "#ff3838" : "transparent" }}>
          Advanced
        </ToggleButton>
        <ToggleButton value="custom" sx={{ color: mode === "custom" ? "#fff" : "#ff8a8a", bgcolor: mode === "custom" ? "#ff3838" : "transparent" }}>
          Custom
        </ToggleButton>
      </ToggleButtonGroup>

      <br />

      <Button 
        variant="contained" 
        sx={{ 
          background: "#ff3838",
          "&:hover": {
            background: "#ff0000",
          },
          "&:disabled": {
            background: "#555",
          }
        }}
        onClick={handleStart}
        disabled={isScanning || !target}
      >
        {isScanning ? "Scanning..." : "Start Scan"}
      </Button>
    </Box>
  );
}

export default ScanSetup;