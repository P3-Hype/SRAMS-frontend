import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from './theme';
import Header from './components/Header/Header';
import RoomAdministrationPage from './pages/RoomAdministrationPage';
import RoomOverviewPage from './pages/RoomOverviewPage';
import HomePage from './pages/HomePage';
import NoPage from './pages/NoPage';
import EditRoomPage from './pages/EditRoomPage';
import EventLogPage from './pages/EventLogPage';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='admin' element={<RoomAdministrationPage />} />
						<Route path='overview' element={<RoomOverviewPage />} />
						<Route path='room/:id' element={<EditRoomPage />} />
						<Route path='events' element={<EventLogPage />} />
						<Route path='*' element={<NoPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
