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
"0.00 - 0.25: Excellent",
"0.25 - 0.50: Good",
"0.50 - 0.75: Fair",
"0.75 -  1.00: Poor"
];

const infoItems = (
	<div style={{ whiteSpace: 'pre-wrap' }}>
		{infoText.map((text) => (
			<React.Fragment key={text}>
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