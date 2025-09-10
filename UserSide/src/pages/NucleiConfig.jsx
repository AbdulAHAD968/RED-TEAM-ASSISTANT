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
  Chip,
  Autocomplete,
} from '@mui/material';
import { PlayArrow, Save } from '@mui/icons-material';

const NucleiConfig = () => {
  const [target, setTarget] = useState('');
  const [templates, setTemplates] = useState([]);
  const [severity, setSeverity] = useState(['low', 'medium', 'high', 'critical']);
  const [options, setOptions] = useState({
    rateLimit: 150,
    timeout: 5,
    retries: 1,
    verbose: false,
    silent: false,
  });

  const severityOptions = ['info', 'low', 'medium', 'high', 'critical'];
  const templateOptions = [
    'cves',
    'default-logins',
    'exposed-panels',
    'exposures',
    'file',
    'misconfiguration',
    'network',
    'technologies',
    'vulnerabilities',
    'wordpress',
  ];

  const handleSeverityChange = (newSeverity) => {
    if (severity.includes(newSeverity)) {
      setSeverity(severity.filter(s => s !== newSeverity));
    } else {
      setSeverity([...severity, newSeverity]);
    }
  };

  const handleOptionChange = (option) => (event) => {
    setOptions({ ...options, [option]: event.target.value });
  };

  const handleScan = () => {
    console.log('Starting Nuclei with options:', {
      target,
      templates,
      severity,
      options
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Nuclei Configuration
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
                label="Target (URL, Host, or CIDR)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="e.g., https://example.com, 192.168.1.1, 10.0.0.0/24"
              />
              
              <Autocomplete
                multiple
                options={templateOptions}
                value={templates}
                onChange={(event, newValue) => {
                  setTemplates(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Templates"
                    margin="normal"
                    placeholder="Select templates"
                  />
                )}
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Severity Levels</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {severityOptions.map(level => (
                    <Chip
                      key={level}
                      label={level.toUpperCase()}
                      onClick={() => handleSeverityChange(level)}
                      color={severity.includes(level) ? 'primary' : 'default'}
                      variant={severity.includes(level) ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Advanced Options
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Rate Limit"
                    type="number"
                    value={options.rateLimit}
                    onChange={(e) => setOptions({...options, rateLimit: e.target.value})}
                    margin="normal"
                    variant="outlined"
                    helperText="Maximum number of requests to send per second"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Timeout (seconds)"
                    type="number"
                    value={options.timeout}
                    onChange={(e) => setOptions({...options, timeout: e.target.value})}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Retries"
                    type="number"
                    value={options.retries}
                    onChange={(e) => setOptions({...options, retries: e.target.value})}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              
              <FormGroup row sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.verbose}
                      onChange={(e) => setOptions({...options, verbose: e.target.checked})}
                      color="primary"
                    />
                  }
                  label="Verbose Output"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.silent}
                      onChange={(e) => setOptions({...options, silent: e.target.checked})}
                      color="primary"
                    />
                  }
                  label="Silent Mode"
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
                nuclei<br />
                -u {target || '&lt;target&gt;'}<br />
                {templates.length > 0 && `-t ${templates.join(',')}`}<br />
                {severity.length > 0 && `-severity ${severity.join(',')}`}<br />
                -rate-limit {options.rateLimit}<br />
                -timeout {options.timeout}<br />
                -retries {options.retries}<br />
                {options.verbose && '-v'}<br />
                {options.silent && '-silent'}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                About Nuclei
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                Nuclei is a fast, template-based vulnerability scanner that focuses on extensive configurability, 
                massive extensibility, and ease of use.
              </Typography>
              
              <Typography variant="body2">
                It uses a community-driven template registry with thousands of templates for various vulnerabilities, 
                misconfigurations, and exposures across different technologies and services.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NucleiConfig;