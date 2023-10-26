import { Shadows, createTheme } from '@mui/material/styles';

export const theme = createTheme({
	shadows: Array(25).fill('none') as Shadows,
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
				root: ({ theme }) => ({
					'&.Mui-selected': {
						color: theme.palette.primary.contrastText,
						backgroundColor: theme.palette.primary.dark,
					},
				}),
			},
		},
		MuiCard: {
			styleOverrides: {
				root: ({ theme }) => ({
					boxShadow: '0px 10px 50px -15px ' + theme.palette.grey[200],
				}),
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				content: {
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				},
			},
		},
	},
});

export default theme;
