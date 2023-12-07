import { AppBar, Box, Container, IconButton, Stack, Toolbar } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Logo from '../Logo/Logo';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import ToggleView from '../ToggleView/ToggleView';
import BookButton from '../BookButton/BookButton';
import React, { useEffect, useState } from 'react';


interface BarContentProps {
  onViewChange: (newView: string) => void;
  currentView: string | null;
}

function BarContent(props: BarContentProps) {
  const location = useLocation();

  return (
    <Stack direction={'row'} alignItems={'center'} width={"100%"}>
      <Box
        sx={{
          flexGrow: '1',
        }}
      >
        <Link
          component={RouterLink}
          to='/'
          style={{
            display: 'inline-block',
          }}
        >
          <Logo expandOnHover />
        </Link>
      </Box>
      <Stack direction={'row'} alignItems={'center'} spacing={3}>
        {(location.pathname === '/dashboard') && (
          <ToggleView currentView={props.currentView} onViewChange={props.onViewChange} />
        )}
        <BookButton />
        <IconButton>
          <HelpOutlineOutlinedIcon
            sx={{
              color: 'primary.contrastText',
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fullWidth, setFullWidth] = useState(false);
  const [currentView, setCurrentView] = React.useState<string | null>(''); // Set an initial value

  useEffect(() => {
    setFullWidth(location.pathname === '/dashboard');
  }, [location]);

  const handleViewChange = (newView: string) => {
    setCurrentView(newView);
    if (newView === 'map' || newView === 'grid') {
      navigate(`/dashboard?view=${newView}`);
    }
  };

  return (
    <AppBar position='relative' sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        {fullWidth 
          ? <BarContent onViewChange={handleViewChange} currentView={currentView} />
          : <Container><BarContent onViewChange={handleViewChange} currentView={currentView} /></Container>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Header;
