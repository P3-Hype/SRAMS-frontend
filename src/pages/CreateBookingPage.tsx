import BasePage from "../components/BasePage/BasePage";
import useAlert from '../hooks/useAlert';
import { Container, Autocomplete, Typography, TextField, Stack } from '@mui/material';
import "../hooks/useRoom";
import Room from "../room";
import { useAllRooms } from "../hooks/useRoom";
import { DateTimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en-gb';



function Content(props: { listofRooms: Room[] }) {
  const inputStyles = {
    width: '200px',
  };


  return (
    <div>
      <Typography variant="h2">
        Booking
      </Typography>

      <Autocomplete
        options={props.listofRooms.map((r) => r.name)}
        renderInput={(params) => <TextField {...params} label='Available rooms' style={inputStyles} />}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <Stack spacing={3} sx={{ width: 300 }}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker label="Pick start time" />
          </DemoContainer>
        </Stack>
      
        <Stack spacing={3} sx={{ width: 300 }}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker label="Pick end time" />
          </DemoContainer>
        </Stack>
      </LocalizationProvider>
    </div>
  )
}


export function CreateBookingPage() {
  const alert = useAlert();
  const temp = useAllRooms();
  const mappedRooms = temp.rooms || [];

  return (
    <BasePage alert={alert}>
      <Container>
        <Content listofRooms={mappedRooms} />
      </Container>
    </BasePage>
  )
}

export default CreateBookingPage;