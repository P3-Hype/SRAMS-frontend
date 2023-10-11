// children: ReactNode,
// alertOpen: boolean,
// alertMessage: string,
// alertSeverity: AlertColor,
// alertCloseFunction: () => void

import { AlertColor } from "@mui/material";
import { useState } from "react"

export function useAlert() {
    const [isOpen, setIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");

    return [
        isOpen, setIsOpen,
        alertMessage, setAlertMessage,
        alertSeverity, setAlertSeverity
    ];
}

export default useAlert