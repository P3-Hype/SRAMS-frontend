import { Alert, Box, Snackbar } from "@mui/material";
import { ReactNode } from "react";
import useAlert from "../../hooks/useAlert";

interface BasePageProps {
    alert: ReturnType<typeof useAlert>,
    children: ReactNode,
}

export function BasePage(props: BasePageProps) {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.alert.setIsOpen(false);
    }

    return (
        <>
            <Box flex={'row'}>
                {props.children}
            </Box>
            <Snackbar open={props.alert.isOpen} autoHideDuration={10000} onClose={handleClose}>
                <Alert severity={props.alert.severity} onClose={handleClose}>{props.alert.message || "snackbar"}</Alert>
            </Snackbar>
        </>
    );
}

export default BasePage;