import BasePage from "../components/BasePage/BasePage";
import useAlert from '../hooks/useAlert';
import { Container, Autocomplete, Tooltip, useTheme, Typography, TextField } from '@mui/material';
import "../hooks/useRoom";
import Room from "../room";
import { useAllRooms, useRoom } from "../hooks/useRoom";
import { DateTimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



function Content(props: { listofRooms: Room[] }) {
  const inputStyles = {
    width: '200px',
  };
    const headerStyles = {
    align: 'center',
  };
    const datePickerStyles = {
    height: '40px',
  };


  return (
    <div>
      <Typography variant="h2" style={headerStyles}>
        Booking
      </Typography>


      <Autocomplete
        options={props.listofRooms.map((r) => r.name)}
        renderInput={(params) => <TextField {...params} label='Available rooms' style={inputStyles} />}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker label="Basic date time picker" style={datePickerStyles} />
        </DemoContainer>
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker label="Basic date time picker" style={datePickerStyles} />
        </DemoContainer>
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