import { Box } from "@mui/material";
import { ReactNode } from "react";

interface BasePageProps {
    children: ReactNode
}

export function BasePage(props: BasePageProps) {
    return (
    <Box>
        {props.children}
    </Box>
    );
}

export default BasePage;