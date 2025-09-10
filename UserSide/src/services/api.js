// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  health: () => 
    fetch(`${API_BASE_URL}/api/health`)
      .then(handleResponse),

  runNmapScan: (target, options = "") => 
    fetch(`${API_BASE_URL}/api/scan/nmap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, options })
    }).then(handleResponse),

  runRustScan: (target, options = "") => 
    fetch(`${API_BASE_URL}/api/scan/rustscan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, options })
    }).then(handleResponse),

  runGobusterScan: (target, options = "") => 
    fetch(`${API_BASE_URL}/api/scan/gobuster`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, options })
    }).then(handleResponse),

  runWhatWebScan: (target, options = "") => 
    fetch(`${API_BASE_URL}/api/scan/whatweb`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, options })
    }).then(handleResponse),

  runNiktoScan: (target, options = "") => 
    fetch(`${API_BASE_URL}/api/scan/nikto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, options })
    }).then(handleResponse),

  runTestSSLScan: (target, options = "") => 
    fetch(`${API_BASE_URL}/api/scan/testssl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, options })
    }).then(handleResponse),

  runNucleiScan: (target, options = "") => 
    fetch(`${API_BASE_URL}/api/scan/nuclei`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, options })
    }).then(handleResponse),

  runSubdomainScan: (target, options = "") => 
    fetch(`${API_BASE_URL}/api/scan/subdomain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, options })
    }).then(handleResponse),

  runBasicScan: (target) => 
    fetch(`${API_BASE_URL}/api/scan/basic-scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target })
    }).then(handleResponse),

  runAdvancedScan: (target) => 
    fetch(`${API_BASE_URL}/api/scan/advanced-scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target })
    }).then(handleResponse),

  getScanStatus: (scanId) => 
    fetch(`${API_BASE_URL}/api/scan/status/${scanId}`)
      .then(handleResponse),

  getScanResults: (scanId) => 
    fetch(`${API_BASE_URL}/api/scan/results/${scanId}`)
      .then(handleResponse),

  getScanHistory: () => 
    fetch(`${API_BASE_URL}/api/scan/history`)
      .then(handleResponse),

  generateReport: (scanIds, reportType, options) => 
    fetch(`${API_BASE_URL}/api/report/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scan_ids: scanIds, report_type: reportType, options })
    }).then(handleResponse),

  getReport: (reportId) => 
    fetch(`${API_BASE_URL}/api/report/${reportId}`)
      .then(handleResponse),

  getAllReports: () => 
    fetch(`${API_BASE_URL}/api/report/`)
      .then(handleResponse),
};
