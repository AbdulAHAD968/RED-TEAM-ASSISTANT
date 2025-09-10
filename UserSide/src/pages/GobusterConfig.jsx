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
  FormControlLabel,
  Switch,
} from '@mui/material';
import { PlayArrow, Save } from '@mui/icons-material';

const GobusterConfig = () => {
  const [url, setUrl] = useState('');
  const [wordlist, setWordlist] = useState('/usr/share/wordlists/dirb/common.txt');
  const [mode, setMode] = useState('dir');
  const [statusCodes, setStatusCodes] = useState('200,204,301,302,307,401,403');
  const [threads, setThreads] = useState(10);
  const [extensions, setExtensions] = useState('');
  const [followRedirect, setFollowRedirect] = useState(false);
  const [verbose, setVerbose] = useState(false);

  const handleScan = () => {
    console.log('Starting Gobuster with options:', {
      url,
      wordlist,
      mode,
      statusCodes,
      threads,
      extensions,
      followRedirect,
      verbose
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gobuster Configuration
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
                label="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="e.g., https://example.com, http://192.168.1.1"
              />
              
              <TextField
                fullWidth
                label="Wordlist Path"
                value={wordlist}
                onChange={(e) => setWordlist(e.target.value)}
                margin="normal"
                variant="outlined"
                helperText="Path to wordlist file"
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Mode</InputLabel>
                <Select
                  value={mode}
                  label="Mode"
                  onChange={(e) => setMode(e.target.value)}
                >
                  <MenuItem value="dir">Directory/File (dir)</MenuItem>
                  <MenuItem value="dns">DNS Subdomain (dns)</MenuItem>
                  <MenuItem value="vhost">VHost (vhost)</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Status Codes"
                value={statusCodes}
                onChange={(e) => setStatusCodes(e.target.value)}
                margin="normal"
                variant="outlined"
                helperText="Comma-separated list of status codes to consider as valid"
              />
              
              <TextField
                fullWidth
                label="Threads"
                type="number"
                value={threads}
                onChange={(e) => setThreads(e.target.value)}
                margin="normal"
                variant="outlined"
                inputProps={{ min: 1, max: 100 }}
              />
              
              <TextField
                fullWidth
                label="Extensions"
                value={extensions}
                onChange={(e) => setExtensions(e.target.value)}
                margin="normal"
                variant="outlined"
                helperText="Comma-separated list of extensions (e.g., php,txt,html)"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={followRedirect}
                    onChange={(e) => setFollowRedirect(e.target.checked)}
                    color="primary"
                  />
                }
                label="Follow Redirects"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={verbose}
                    onChange={(e) => setVerbose(e.target.checked)}
                    color="primary"
                  />
                }
                label="Verbose Output"
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
                gobuster {mode}<br />
                -u {url || '&lt;url&gt;'}<br />
                -w {wordlist}<br />
                -s {statusCodes}<br />
                -t {threads}<br />
                {extensions && `-x ${extensions}`}<br />
                {followRedirect && '--follow-redirect'}<br />
                {verbose && '-v'}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Common Wordlists
              </Typography>
              
              {[
                { name: 'Common (dirb)', path: '/usr/share/wordlists/dirb/common.txt' },
                { name: 'Big (dirb)', path: '/usr/share/wordlists/dirb/big.txt' },
                { name: 'Directory List 2.3 Medium', path: '/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt' },
                { name: 'RockYou', path: '/usr/share/wordlists/rockyou.txt' },
              ].map((wordlist, index) => (
                <Box key={index} sx={{ py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Typography variant="body2">{wordlist.name}</Typography>
                  <Typography variant="caption" color="textSecondary">{wordlist.path}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GobusterConfig;