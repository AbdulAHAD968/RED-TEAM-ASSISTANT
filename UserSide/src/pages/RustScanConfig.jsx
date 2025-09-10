import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
  Divider,
  Slider,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { PlayArrow, Save } from '@mui/icons-material';

const RustScanConfig = () => {
  const [target, setTarget] = useState('');
  const [ports, setPorts] = useState('1-1000');
  const [scanOrder, setScanOrder] = useState('serial');
  const [timeout, setTimeout] = useState(1500);
  const [batchSize, setBatchSize] = useState(4500);
  const [ulimit, setUlimit] = useState(5000);
  const [greppable, setGreppable] = useState(false);

  const handleScan = () => {
    console.log('Starting RustScan with options:', {
      target,
      ports,
      scanOrder,
      timeout,
      batchSize,
      ulimit,
      greppable
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        RustScan Configuration
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
              
              <TextField
                fullWidth
                label="Ports to Scan"
                value={ports}
                onChange={(e) => setPorts(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="e.g., 1-1000, 80,443,8080, 22-25"
                helperText="Specify ports or port ranges to scan"
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Scan Order</InputLabel>
                <Select
                  value={scanOrder}
                  label="Scan Order"
                  onChange={(e) => setScanOrder(e.target.value)}
                >
                  <MenuItem value="serial">Serial (Default)</MenuItem>
                  <MenuItem value="random">Random</MenuItem>
                </Select>
              </FormControl>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Advanced Options
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Timeout (ms)</Typography>
                <Slider
                  value={timeout}
                  onChange={(e, newValue) => setTimeout(newValue)}
                  valueLabelDisplay="auto"
                  min={100}
                  max={5000}
                  step={100}
                />
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Batch Size</Typography>
                <Slider
                  value={batchSize}
                  onChange={(e, newValue) => setBatchSize(newValue)}
                  valueLabelDisplay="auto"
                  min={1000}
                  max={10000}
                  step={500}
                />
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>ULimit</Typography>
                <Slider
                  value={ulimit}
                  onChange={(e, newValue) => setUlimit(newValue)}
                  valueLabelDisplay="auto"
                  min={1000}
                  max={10000}
                  step={500}
                />
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={greppable}
                    onChange={(e) => setGreppable(e.target.checked)}
                    color="primary"
                  />
                }
                label="Greppable Output"
                sx={{ mt: 2 }}
              />
              
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
                rustscan<br />
                -a {target || '&lt;target&gt;'}<br />
                -p {ports}<br />
                --scan-order {scanOrder}<br />
                -t {timeout}<br />
                -b {batchSize}<br />
                -u {ulimit}<br />
                {greppable && '--greppable'}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Recent Scans
              </Typography>
              
              {[
                { target: '192.168.1.1', ports: '1-1000', date: '2023-06-15' },
                { target: 'example.com', ports: 'top-100', date: '2023-06-14' },
                { target: '10.0.0.0/24', ports: '1-65535', date: '2023-06-12' },
              ].map((scan, index) => (
                <Box key={index} sx={{ py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Typography variant="body2">{scan.target} ({scan.ports})</Typography>
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

export default RustScanConfig;