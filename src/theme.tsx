import { Shadows, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  shadows: Array(25).fill("none") as Shadows,
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3a42',
    },
    secondary: {
      main: '#ff6600',
    },
    background: {
      default: '#e7f5f5',
      paper: '#f7fdfd',
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: ({theme}) => ({
          "&.Mui-selected": {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.dark
          },
        })
      }
    }
  }
});

export default theme