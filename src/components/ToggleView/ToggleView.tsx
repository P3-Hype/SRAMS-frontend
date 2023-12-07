import * as React from 'react';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ViewComfyOutlinedIcon from '@mui/icons-material/ViewComfyOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';

interface ToggleViewProps {
  currentView: string | null;
  onViewChange: (newView: string) => void;
}

export default function ToggleView({ currentView, onViewChange }: ToggleViewProps) {
	const handleView = (_: React.MouseEvent<HTMLElement>, newView: string | null) => {
	  if (newView !== null) {
		onViewChange(newView);
	  }
	};
  
	return (
	  <ToggleButtonGroup value={currentView} exclusive onChange={handleView} aria-label='view mode'>
		<ToggleButton value='grid' aria-label='grid view'>
		  <Tooltip title='Grid'>
			<ViewComfyOutlinedIcon />
		  </Tooltip>
		</ToggleButton>
		<ToggleButton value='map' aria-label='map view'>
		  <Tooltip title='Map'>
			<MapOutlinedIcon />
		  </Tooltip>
		</ToggleButton>
	  </ToggleButtonGroup>
	);
  }