import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import RoomAdministrationPage from './pages/RoomAdministrationPage';
import RoomOverviewPage from './pages/RoomOverviewPage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
      <BrowserRouter>
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