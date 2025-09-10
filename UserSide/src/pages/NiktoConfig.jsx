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
  FormControlLabel,
  Switch,
  FormGroup,
} from '@mui/material';
import { PlayArrow, Save } from '@mui/icons-material';

const NiktoConfig = () => {
  const [url, setUrl] = useState('');
  const [port, setPort] = useState('');
  const [evasion, setEvasion] = useState('');
  const [timeout, setTimeout] = useState(10);
  const [userAgent, setUserAgent] = useState('Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0');
  const [tuning, setTuning] = useState({
    xss: true,
    sqlInjection: true,
    commandInjection: true,
    remoteFileInclusion: true,
    sensitiveFiles: true,
  });

  const handleTuningChange = (option) => (event) => {
    setTuning({ ...tuning, [option]: event.target.checked });
  };

  const handleScan = () => {
    console.log('Starting Nikto with options:', {
      url,
      port,
      evasion,
      timeout,
      userAgent,
      tuning
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Nikto Configuration
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
                label="Target URL or Host"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="e.g., https://example.com, 192.168.1.1"
              />
              
              <TextField
                fullWidth
                label="Port (optional)"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="e.g., 80, 443, 8080"
              />
              
              <TextField
                fullWidth
                label="Evasion Technique (optional)"
                value={evasion}
                onChange={(e) => setEvasion(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="1-9 ( evasion techniques)"
                helperText="1: Random URI encoding, 2: Directory self-reference, 3: Premature URL ending, 4: Prepend long random string, 5: Fake parameter, 6: TAB as request spacer, 7: Change case, 8: Windows directory separator, 9: Unix directory separator"
              />
              
              <TextField
                fullWidth
                label="Timeout (seconds)"
                type="number"
                value={timeout}
                onChange={(e) => setTimeout(e.target.value)}
                margin="normal"
                variant="outlined"
                inputProps={{ min: 1, max: 60 }}
              />
              
              <TextField
                fullWidth
                label="User Agent"
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Scan Tuning
              </Typography>
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={tuning.xss}
                      onChange={handleTuningChange('xss')}
                      color="primary"
                    />
                  }
                  label="Cross-Site Scripting (XSS) Tests"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={tuning.sqlInjection}
                      onChange={handleTuningChange('sqlInjection')}
                      color="primary"
                    />
                  }
                  label="SQL Injection Tests"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={tuning.commandInjection}
                      onChange={handleTuningChange('commandInjection')}
                      color="primary"
                    />
                  }
                  label="Command Injection Tests"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={tuning.remoteFileInclusion}
                      onChange={handleTuningChange('remoteFileInclusion')}
                      color="primary"
                    />
                  }
                  label="Remote File Inclusion Tests"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={tuning.sensitiveFiles}
                      onChange={handleTuningChange('sensitiveFiles')}
                      color="primary"
                    />
                  }
                  label="Sensitive Files Discovery"
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
                nikto.pl<br />
                -h {url || '&lt;url&gt;'}<br />
                {port && `-p ${port}`}<br />
                {evasion && `-evasion ${evasion}`}<br />
                -timeout {timeout}<br />
                -useragent "{userAgent}"<br />
                {!tuning.xss && '-Tuning 0'}<br />
                {!tuning.sqlInjection && '-Tuning 1'}<br />
                {!tuning.commandInjection && '-Tuning 2'}<br />
                {!tuning.remoteFileInclusion && '-Tuning 3'}<br />
                {!tuning.sensitiveFiles && '-Tuning 4'}<br />
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                About Nikto
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                Nikto is an Open Source web server scanner that performs comprehensive tests against web servers for 
                multiple items, including dangerous files/CGIs, outdated server software, and other problems.
              </Typography>
              
              <Typography variant="body2">
                It checks for over 6700 potentially dangerous files/CGIs, checks for outdated versions of over 1250 servers, 
                and version specific problems on over 270 servers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NiktoConfig;