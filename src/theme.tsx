import { Shadows, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  shadows: Array(25).fill("none") as Shadows,
  palette: {
    mode: 'dark',
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#38ff80',
      contrastText: 'rgba(13,14,14,0.87)',
      dark: '#39d071',
    },
    background: {
      default: '#1f1f23',
      paper: '#2e3b39',
    },
    text: {
      primary: 'rgba(255,255,250,0.87)',
      secondary: 'rgba(223,228,214,0.54)',
    },
    divider: '#24242b',
    success: {
      main: '#4fd655',
    },
    error: {
      main: '#ff5252',
    },
  },
});

  export default theme