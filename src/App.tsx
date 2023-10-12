import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import RoomAdministrationPage from './pages/RoomAdministrationPage';
import RoomOverviewPage from './pages/RoomOverviewPage';

function App() {

  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="admin" element={<RoomAdministrationPage/>} />
          <Route path="overview" element={<RoomOverviewPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App