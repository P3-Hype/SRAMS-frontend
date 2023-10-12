import { Box } from "@mui/material";
import { ReactNode } from "react";

interface BasePageProps {
    children: ReactNode,
}

export function BasePage(props: BasePageProps) {
    return (
        <>
            <Box flex={'row'}>
                {props.children}
            </Box>
        </>
    );
}

export default BasePage;