import * as React from 'react';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="view mode"
    >
      <ToggleButton value="left" aria-label="grid view">
        <ViewComfyOutlinedIcon />
      </ToggleButton>
      <ToggleButton value="right" aria-label="map view">
        <MapOutlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}