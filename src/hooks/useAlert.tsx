// children: ReactNode,
// alertOpen: boolean,
// alertMessage: string,
// alertSeverity: AlertColor,
// alertCloseFunction: () => void

import { AlertColor } from "@mui/material";
import { useState } from "react"

export function useAlert() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("info");

    return {
        isOpen,
        setIsOpen,
        message,
        setMessage,
        severity,
        setSeverity
    };
}

export default useAlert