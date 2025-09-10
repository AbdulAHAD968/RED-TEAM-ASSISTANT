import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Security, Explore } from '@mui/icons-material';

function LandingPage({ onModeSelect }) {
  const navigate = useNavigate();

  const handleSelect = (mode) => {
    onModeSelect(mode);      // set mode in App.js
    navigate('/dashboard');  // always go to same dashboard
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at top right, #1a0000 0%, #0a0000 100%)',
      color: '#fff',
      textAlign: 'center',
      gap: 4,
      p: 3
    }}>
      <Typography variant="h3" sx={{ 
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #ff6b6b 30%, #ff3838 90%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 2
      }}>
        Red Team Toolkit
      </Typography>

      <Typography variant="h6" sx={{ maxWidth: '600px', opacity: 0.8 }}>
        Choose your operation mode. Guided mode is simplified with Normal/Advanced scans. 
        Unguided mode gives you full control of each tool configuration.
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', mt: 4 }}>
        {/* Guided Mode */}
        <Card sx={{ width: 280, backgroundColor: 'rgba(40,0,0,0.6)', color: '#fff', border: '1px solid rgba(255,80,80,0.3)' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Security sx={{ fontSize: 60, color: '#ff6b6b', mb: 2 }} />
            <Typography variant="h5" gutterBottom>Guided Mode</Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
              Run quick Normal or Advanced scans with minimal setup.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => handleSelect('guided')}
              sx={{ 
                background: 'linear-gradient(45deg, #ff6b6b, #ff3838)', 
                '&:hover': { background: 'linear-gradient(45deg, #ff3838, #ff6b6b)' } 
              }}
            >
              Start Guided
            </Button>
          </CardContent>
        </Card>

        {/* Unguided Mode */}
        <Card sx={{ width: 280, backgroundColor: 'rgba(40,0,0,0.6)', color: '#fff', border: '1px solid rgba(255,80,80,0.3)' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Explore sx={{ fontSize: 60, color: '#ff3838', mb: 2 }} />
            <Typography variant="h5" gutterBottom>Unguided Mode</Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
              Full manual control. Configure each tool separately and run custom scans.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => handleSelect('unguided')}
              sx={{ 
                background: 'linear-gradient(45deg, #ff3838, #ff6b6b)', 
                '&:hover': { background: 'linear-gradient(45deg, #ff6b6b, #ff3838)' } 
              }}
            >
              Start Unguided
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default LandingPage;
