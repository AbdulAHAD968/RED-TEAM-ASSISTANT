import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, IconButton, Typography, Chip } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Security } from '@mui/icons-material';
import theme from './styles/theme';
import SideDrawer from './components/SideDrawer/SideDrawer';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import NmapConfig from './pages/NmapConfig';
import RustScanConfig from './pages/RustScanConfig';
import GobusterConfig from './pages/GobusterConfig';
import WhatWebConfig from './pages/WhatWebConfig';
import NiktoConfig from './pages/NiktoConfig';
import TestSSLConfig from './pages/TestSSLConfig';
import NucleiConfig from './pages/NucleiConfig';
import ReportGenerator from './pages/ReportGenerator';
import SubdomainEnum from './pages/SubdomainEnum';
import AnalysisIntelligence from './pages/AnalysisIntelligence';

function AppContent({ mode, setMode, drawerOpen, setDrawerOpen }) {
  const location = useLocation();

  const isLanding = location.pathname === "/";

  return (
    <Box sx={{ display: "flex" }}>
      {/* Hide AppBar + Drawer on LandingPage */}
      {!isLanding && (
        <>
          <AppBar position="fixed" sx={{ background: "#450000" }}>
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Security sx={{ mr: 1, color: "#ff6b6b" }} />
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Red Team Toolkit
              </Typography>
              <Chip 
                icon={<Security />} 
                label={mode ? `${mode} Mode` : "Select Mode"} 
                size="small"
                sx={{ backgroundColor: "rgba(180,0,0,0.3)", color: "#ff6b6b" }} 
              />
            </Toolbar>
          </AppBar>

          {/* Drawer with filtered menu */}
          {mode && (
            <SideDrawer type={mode} open={drawerOpen} setOpen={setDrawerOpen} />
          )}
        </>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: isLanding ? 0 : 8 }}>
        <Routes>
          {/* LandingPage (no sidebar) */}
          <Route path="/" element={<LandingPage onModeSelect={(m) => {
            setMode(m);
            localStorage.setItem("mode", m);
          }} />} />

          {/* Always same pages */}
          <Route path="/dashboard" element={mode ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/nmap" element={mode ? <NmapConfig /> : <Navigate to="/" />} />
          <Route path="/rustscan" element={mode ? <RustScanConfig /> : <Navigate to="/" />} />
          <Route path="/gobuster" element={mode ? <GobusterConfig /> : <Navigate to="/" />} />
          <Route path="/whatweb" element={mode ? <WhatWebConfig /> : <Navigate to="/" />} />
          <Route path="/nikto" element={mode ? <NiktoConfig /> : <Navigate to="/" />} />
          <Route path="/testssl" element={mode ? <TestSSLConfig /> : <Navigate to="/" />} />
          <Route path="/nuclei" element={mode ? <NucleiConfig /> : <Navigate to="/" />} />
          <Route path="/subdomain-enum" element={mode ? <SubdomainEnum /> : <Navigate to="/" />} />
          <Route path="/intel" element={mode ? <AnalysisIntelligence /> : <Navigate to="/" />} />
          <Route path="/report" element={mode ? <ReportGenerator /> : <Navigate to="/" />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("mode") || null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent 
          mode={mode} 
          setMode={setMode} 
          drawerOpen={drawerOpen} 
          setDrawerOpen={setDrawerOpen} 
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
