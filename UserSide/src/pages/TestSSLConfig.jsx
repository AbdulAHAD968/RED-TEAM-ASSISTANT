import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { PlayArrow, Save } from '@mui/icons-material';

const TestSSLConfig = () => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState(443);
  const [checks, setChecks] = useState({
    protocols: true,
    ciphers: true,
    serverPreferences: true,
    serverDefaults: true,
    vulnerabilities: true,
    certificate: true,
  });

  const handleCheckChange = (check) => (event) => {
    setChecks({ ...checks, [check]: event.target.checked });
  };

  const handleScan = () => {
    console.log('Starting testssl.sh with options:', {
      host,
      port,
      checks
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        TestSSL.sh Configuration
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Scan Configuration
              </Typography>
              
              <TextField
                fullWidth
                label="Host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="e.g., example.com, 192.168.1.1"
              />
              
              <TextField
                fullWidth
                label="Port"
                type="number"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                margin="normal"
                variant="outlined"
                inputProps={{ min: 1, max: 65535 }}
              />
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Test Options
              </Typography>
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checks.protocols}
                      onChange={handleCheckChange('protocols')}
                      color="primary"
                    />
                  }
                  label="Protocol Support (SSLv2, SSLv3, TLSv1.0, TLSv1.1, TLSv1.2, TLSv1.3)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checks.ciphers}
                      onChange={handleCheckChange('ciphers')}
                      color="primary"
                    />
                  }
                  label="Cipher Suites"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checks.serverPreferences}
                      onChange={handleCheckChange('serverPreferences')}
                      color="primary"
                    />
                  }
                  label="Server Preferences"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checks.serverDefaults}
                      onChange={handleCheckChange('serverDefaults')}
                      color="primary"
                    />
                  }
                  label="Server Defaults"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checks.vulnerabilities}
                      onChange={handleCheckChange('vulnerabilities')}
                      color="primary"
                    />
                  }
                  label="Vulnerability Tests (Heartbleed, CCS, Ticketbleed, etc.)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checks.certificate}
                      onChange={handleCheckChange('certificate')}
                      color="primary"
                    />
                  }
                  label="Certificate Information"
                />
              </FormGroup>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={handleScan}
                  size="large"
                >
                  Start Scan
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Save />}
                  size="large"
                >
                  Save Configuration
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Command Preview
              </Typography>
              
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                testssl.sh<br />
                {host || '&lt;host&gt;'}:{port}<br />
                {!checks.protocols && '--protocols'}<br />
                {!checks.ciphers && '--ciphers'}<br />
                {!checks.serverPreferences && '--server-preferences'}<br />
                {!checks.serverDefaults && '--server-defaults'}<br />
                {!checks.vulnerabilities && '--vulnerabilities'}<br />
                {!checks.certificate && '--certificate'}<br />
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                About TestSSL.sh
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                testssl.sh is a free command line tool that checks a server's service on any port for the support of 
                TLS/SSL ciphers, protocols as well as some cryptographic flaws.
              </Typography>
              
              <Typography variant="body2">
                It's designed to provide clear and comprehensive output about the SSL/TLS configuration of servers, 
                including support for various protocols, cipher suites, and vulnerabilities.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestSSLConfig;