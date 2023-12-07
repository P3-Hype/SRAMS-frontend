import React from 'react';
import { Container, Typography } from '@mui/material';
import MapImage from '../../images/kontor-plantegning-2d-med-etiketter.jpg';

const DashboardMapView: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard Map View
      </Typography>
      <img src={MapImage} alt="Map View" style={{ width: '100%', maxWidth: '800px', margin: 'auto' }} />
    </Container>
  );
};

export default DashboardMapView;
