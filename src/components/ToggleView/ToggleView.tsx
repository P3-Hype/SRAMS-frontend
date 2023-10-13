import * as React from 'react';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';

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
      <ToggleButton value="grid" aria-label="grid view">
        <Tooltip title='Grid'>
            <ViewComfyOutlinedIcon />
        </Tooltip>
      </ToggleButton>

      <ToggleButton value="map" aria-label="map view">
        <Tooltip title='Map'>
            <MapOutlinedIcon />
        </Tooltip>
      </ToggleButton>

    </ToggleButtonGroup>
  );
}