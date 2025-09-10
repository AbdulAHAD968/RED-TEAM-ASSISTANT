import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff3838',
      light: '#ff6b6b',
      dark: '#c50000',
    },
    secondary: {
      main: '#ff8a8a',
      light: '#ffbdbd',
      dark: '#c95a5a',
    },
    background: {
      default: '#0a0000',
      paper: '#1a0000',
    },
    error: {
      main: '#ff3838',
      light: '#ff6b6b',
      dark: '#c50000',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      background: 'linear-gradient(45deg, #ff6b6b 30%, #ff3838 90%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h4: {
      fontWeight: 600,
      color: '#ff8a8a',
    },
    h6: {
      color: '#ff6b6b',
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #1a0000 0%, #2a0000 100%)',
          boxShadow: '0 8px 32px 0 rgba(150, 0, 0, 0.3)',
          border: '1px solid rgba(255, 80, 80, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          '&:hover': {
            boxShadow: '0 12px 40px 0 rgba(180, 0, 0, 0.4)',
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #ff3838 0%, #c50000 100%)',
          boxShadow: '0 4px 14px 0 rgba(180, 0, 0, 0.4)',
          '&:hover': {
            background: 'linear-gradient(45deg, #ff5252 0%, #d50000 100%)',
            boxShadow: '0 6px 20px 0 rgba(200, 0, 0, 0.6)',
          },
        },
        outlined: {
          background: 'transparent',
          border: '1px solid #ff3838',
          color: '#ff6b6b',
          '&:hover': {
            background: 'rgba(180, 0, 0, 0.1)',
            border: '1px solid #ff5252',
          }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #220000 0%, #450000 100%)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 80, 80, 0.2)',
        },
      },
    },
  },
});

export default theme;