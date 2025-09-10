import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Grid,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  Save,
  Download,
} from '@mui/icons-material';

const NmapConfig = () => {
  const [target, setTarget] = useState('');
  const [options, setOptions] = useState({
    synScan: true,
    versionDetection: true,
    osDetection: false,
    scriptScan: false,
    aggressive: false,
    verbose: false,
  });

  const handleOptionChange = (option) => (event) => {
    setOptions({ ...options, [option]: event.target.checked });
  };

  const handleScan = () => {
    // This will be connected to backend later
    console.log('Starting scan with options:', options, 'target:', target);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Nmap Configuration
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
                label="Target (IP, Hostname, or Network)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="e.g., 192.168.1.1, example.com, 10.0.0.0/24"
              />
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Scan Options
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={options.synScan}
                        onChange={handleOptionChange('synScan')}
                        color="primary"
                      />
                    }
                    label="SYN Scan (-sS)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={options.versionDetection}
                        onChange={handleOptionChange('versionDetection')}
                        color="primary"
                      />
                    }
                    label="Version Detection (-sV)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={options.osDetection}
                        onChange={handleOptionChange('osDetection')}
                        color="primary"
                      />
                    }
                    label="OS Detection (-O)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={options.scriptScan}
                        onChange={handleOptionChange('scriptScan')}
                        color="primary"
                      />
                    }
                    label="Script Scan (-sC)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={options.aggressive}
                        onChange={handleOptionChange('aggressive')}
                        color="primary"
                      />
                    }
                    label="Aggressive Mode (-A)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={options.verbose}
                        onChange={handleOptionChange('verbose')}
                        color="primary"
                      />
                    }
                    label="Verbose Output (-v)"
                  />
                </Grid>
              </Grid>
              
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
                nmap {options.synScan ? '-sS ' : ''}
                {options.versionDetection ? '-sV ' : ''}
                {options.osDetection ? '-O ' : ''}
                {options.scriptScan ? '-sC ' : ''}
                {options.aggressive ? '-A ' : ''}
                {options.verbose ? '-v ' : ''}
                {target || '<target>'}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Recent Scans
              </Typography>
              
              {[
                { target: '192.168.1.1', date: '2023-06-15 14:32' },
                { target: 'example.com', date: '2023-06-14 09:15' },
                { target: '10.0.0.0/24', date: '2023-06-12 16:45' },
              ].map((scan, index) => (
                <Box key={index} sx={{ py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Typography variant="body2">{scan.target}</Typography>
                  <Typography variant="caption" color="textSecondary">{scan.date}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NmapConfig;