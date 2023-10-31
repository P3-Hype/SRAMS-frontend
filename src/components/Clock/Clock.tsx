import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export const Clock = () => {
    const [time , setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
             setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    },[]);
  
    return (<Typography>{time.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})}</Typography>)
}

