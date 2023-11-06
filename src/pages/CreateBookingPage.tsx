/*
import BasePage from "../components/BasePage/BasePage";
import useAlert from '../hooks/useAlert';
import { Container, Autocomplete, Tooltip, useTheme, TextField } from '@mui/material';
import "../hooks/useRoom";
import Room from "../room";
import { useAllRooms, useRoom } from "../hooks/useRoom";
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



function Content(props: {listofRooms: Room[]}) {
    
    return(
        <Autocomplete
        options={ props.listofRooms.map(r => r.name)}
        renderInput={(params) => <TextField {...params} label='Available rooms' />}
        />
        
    )
}


export function CreateBookingPage() {
    const alert = useAlert();
    const temp =  useAllRooms();
    const mappedRooms = temp.rooms?.map( r => ({ r.name }));

    return(
        <BasePage alert={alert}>
            <Container>
				<Content listofRooms={mappedRooms} />
			</Container>
        </BasePage>
    )
}
*/