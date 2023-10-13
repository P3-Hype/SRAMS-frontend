import Header from './components/Header/Header';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import HomePage from './pages/HomePage';
import RoomAdministrationPage from './pages/RoomAdministrationPage';
import RoomOverviewPage from './pages/RoomOverviewPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="admin" element={<RoomAdministrationPage/>} />
          <Route path="overview" element={<RoomOverviewPage/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}


export default App