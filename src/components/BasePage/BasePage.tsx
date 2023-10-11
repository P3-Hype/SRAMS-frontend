import { Alert, AlertColor, Box, IconButton, Snackbar } from "@mui/material";
import { ReactNode } from "react";

interface BasePageProps {
    children: ReactNode,
    alertOpen: boolean,
    alertMessage: string,
    alertSeverity: AlertColor,
    alertCloseFunction: () => void
}

export function BasePage(props: BasePageProps) {

    const handleClose = () => {
        props.alertCloseFunction();
    }

    return (
        <>
            <Box flex={'row'}>
                {props.children}
            </Box>
            <Snackbar autoHideDuration={6000} onClose={handleClose}>
                <>
                    <Alert severity={props.alertSeverity}>{props.alertMessage}</Alert>
                </>
            </Snackbar>
        </>
    );
}

export default BasePage;