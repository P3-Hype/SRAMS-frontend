import Header from './components/Header/Header';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import HomePage from './pages/HomePage';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
    </ThemeProvider>
  )
}


export default App