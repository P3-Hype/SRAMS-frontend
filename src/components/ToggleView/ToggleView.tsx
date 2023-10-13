import * as React from 'react';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';

export default function ToggleButtons() {
  const [view, setView] = React.useState<string | null>('grid');

  const handleView = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null,
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleView}
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