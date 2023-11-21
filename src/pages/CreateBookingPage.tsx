import BasePage from "../components/BasePage/BasePage";
import useAlert from '../hooks/useAlert';
import { Container, Autocomplete, Typography, TextField, Stack, Paper } from '@mui/material';
import Room from "../room";
import { useAllRooms } from "../hooks/useRoom";
import { DatePicker, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en-gb';
import ConfirmBookingButton from "../components/ConfirmBookingButton/ConfirmBookingButton";


function Content(props: { listofRooms: Room[] }) {
  const inputStyles = {
    width: '200px',
  };



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

          <TimePicker
            label="Select start time"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }} />
          <TimePicker
            label="Select end time"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }} />

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