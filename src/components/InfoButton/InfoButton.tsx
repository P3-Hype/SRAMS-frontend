import { IconButton, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import React from "react";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
  },
});

const infoText = [
"Climate Air Quality Index (CAQI) is a measure of the indoor climate quality.",
"",
"A lower climate score indicates good indoor climate conditions.",
"",
"0-0.25    = Best",
"0.25-0.5 = Better",
"0.5-0.75 = Worse",
"0.75-1     = Worst"
];

const infoItems = (
	<div style={{ whiteSpace: 'pre-wrap' }}>
		{infoText.map((text, index) => (
			<React.Fragment key={index}>
				{text}
				<br />
			</React.Fragment>
		))}
	</div>
);

function InfoButton() {
  return (
    <IconButton>
      <CustomWidthTooltip title={infoItems}>
        <HelpOutlineOutlinedIcon
          sx={{
            color: 'primary.contrastText'
          }}
        />
      </CustomWidthTooltip>
    </IconButton>
  )
}



export default InfoButton;