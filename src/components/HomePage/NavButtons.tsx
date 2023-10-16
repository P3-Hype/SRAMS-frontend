
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';


/**
 * NavButtons is a component function that returns 2 styled navigation buttons,
 * which takes the client to the admin or overview page.
 * 
 * @returns 2 nice buttons
 */

export default function NavButtons() {
  const theme = useTheme();

  /**
   * BytStyle is used to style the buttons
   */
  const ButStyle = {
    fontSize: '1.5rem',
    padding: '15px 30px',
    width: '200px',
    height: '125px', 
    variant: "contained",
    backgroundColor: theme.palette.primary.main, // Use primary theme color
    color: 'white', // Set text color
  };

/**
 * GridStyle is used to center align the 2 buttons
 */
  const GridStyle = {
    justifyContent: "center",
    alignItems: "center",
    minHeight: '100vh'
  };

  return (
    <Grid
      container
      spacing={20}
      style={GridStyle}
    >
      <Grid item>
        <Link component={RouterLink} to="/admin">
          <Button
            style={ButStyle}
          >
            Admin
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link component={RouterLink} to="/overview">
          <Button
            style={ButStyle}
          >
            Employee
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}