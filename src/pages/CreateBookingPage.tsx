import BasePage from "../components/BasePage/BasePage";
import { useState } from 'react';
import useAlert from '../hooks/useAlert';
import { Container, Autocomplete, Typography, TextField, Stack, Paper } from '@mui/material';
import Room from "../room";
import { useAllRooms } from "../hooks/useRoom";
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import 'dayjs/locale/en-gb';
import ConfirmBookingButton from "../components/ConfirmBookingButton/ConfirmBookingButton";

function Content(props: { listofRooms: Room[] }) {
  const inputStyles = {
    width: '200px',
  };
  const [time, setTime] = useState(new Date());
  if (!time) { return false;}
    


  return (
    <>
      <Typography variant="h2">
        Booking
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">

        <Stack spacing={3} sx={{ width: 300 }}>
          <Autocomplete
            options={props.listofRooms.map((r) => r.name)}
            renderInput={(params) => <TextField {...params} label='Available rooms' style={inputStyles} />}
          />
          
          <DatePicker label="Choose a booking date" />
          <TimeClock views={['hours', 'minutes']} value={[time]} onChange={(newTime) => setTime(newTime)} />
        </Stack>
      </LocalizationProvider>

      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <ConfirmBookingButton></ConfirmBookingButton>
      </Container>
    </>
  )
}


export function CreateBookingPage() {
  const alert = useAlert();
  const temp = useAllRooms();
  const mappedRooms = temp.rooms ?? [];

  return (
    <BasePage alert={alert}>
      <Container>
        <Paper sx={{ padding: 2 }}>
          <Content listofRooms={mappedRooms} />
        </Paper>
      </Container>
    </BasePage>
  )
}

export default CreateBookingPage;