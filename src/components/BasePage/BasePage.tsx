import { Alert, Box, Snackbar } from "@mui/material";
import { ReactNode, useState } from "react";

interface BasePageProps {
    children: ReactNode
}

export function BasePage(props: BasePageProps) {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    
    return (
        <>
            <Box flex={'row'}>
                {props.children}
            </Box>
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="warning"></Alert>
            </Snackbar>
        </>
    );
}

export default BasePage;