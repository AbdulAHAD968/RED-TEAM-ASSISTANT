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
  Chip,
} from '@mui/material';
import { PlayArrow, Save } from '@mui/icons-material';

const WhatWebConfig = () => {
  const [url, setUrl] = useState('');
  const [aggression, setAggression] = useState(3);
  const [verbosity, setVerbosity] = useState(0);
  const [proxy, setProxy] = useState('');
  const [userAgent, setUserAgent] = useState('WhatWeb/0.5.0');
  const [followRedirect, setFollowRedirect] = useState(true);

  const handleScan = () => {
    console.log('Starting WhatWeb with options:', {
      url,
      aggression,
      verbosity,
      proxy,
      userAgent,
      followRedirect
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        WhatWeb Configuration
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
                label="Target URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="e.g., https://example.com, http://192.168.1.1"
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Aggression Level: {aggression}</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {[1, 2, 3, 4].map(level => (
                    <Chip
                      key={level}
                      label={`Level ${level}`}
                      onClick={() => setAggression(level)}
                      color={aggression === level ? 'primary' : 'default'}
                      variant={aggression === level ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Level 1: Stealthy, Level 4: Heavy
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Verbosity Level: {verbosity}</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {[0, 1, 2, 3, 4].map(level => (
                    <Chip
                      key={level}
                      label={`Level ${level}`}
                      onClick={() => setVerbosity(level)}
                      color={verbosity === level ? 'primary' : 'default'}
                      variant={verbosity === level ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Box>
              
              <TextField
                fullWidth
                label="Proxy (optional)"
                value={proxy}
                onChange={(e) => setProxy(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="e.g., http://proxy:8080, socks5://proxy:9050"
              />
              
              <TextField
                fullWidth
                label="User Agent"
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                margin="normal"
                variant="outlined"
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
                sx={{ mt: 1 }}
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
                whatweb<br />
                {url || '&lt;url&gt;'}<br />
                --aggression={aggression}<br />
                --verbosity={verbosity}<br />
                {proxy && `--proxy ${proxy}`}<br />
                --user-agent "{userAgent}"<br />
                {followRedirect ? '' : '--no-redirect'}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                WhatWeb Details
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                WhatWeb identifies websites by recognizing web technologies including content management systems (CMS), 
                blogging platforms, statistic/analytics packages, JavaScript libraries, web servers, and embedded devices.
              </Typography>
              
              <Typography variant="body2">
                It can identify over 1800 plugins and provides information about version numbers, email addresses, 
                account IDs, web framework modules, SQL errors, and more.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhatWebConfig;