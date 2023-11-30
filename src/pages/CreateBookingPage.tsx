import BasePage from "../components/BasePage/BasePage";
import useAlert from '../hooks/useAlert';
import { Container, Autocomplete, Typography, TextField, Stack, Paper, Button, useTheme } from '@mui/material';
import Room from "../room";
import { useAllRooms } from "../hooks/useRoom";
import { DatePicker, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en-gb';
import { useEffect, useState } from "react";
import Booking from "../booking";
import { Dayjs } from "dayjs";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Content(props: { listofRooms: Room[] }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const inputStyles = {
    width: '200px',
  };
  const [booking, setBooking] = useState<Booking>();
  const [date, setDate] = useState<Dayjs>();
  const [startTime, setStartTime] = useState<Dayjs>();
  const [endTime, setEndTime] = useState<Dayjs>();

  const addBookingMutation = useMutation(() => axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}booking/addBooking`, booking), {
    onSuccess: () => { navigate('/overview') }
  });

  useEffect(() => {
    if (date == undefined) return;
    if (startTime == undefined) return;
    if (endTime == undefined) return;
    const dateUnix = date?.unix() * 1000;
    setBooking({
      ...booking,
      startTime: dateUnix + startTime.hour() * 60 * 60 * 1000 + startTime.minute() * 60 * 1000,
      endTime: dateUnix + endTime.hour() * 60 * 60 * 1000 + endTime.minute() * 60 * 1000
    })
    console.log(booking);
  }, [date, startTime, endTime]);

  const handleAddBooking = () => { addBookingMutation.mutate() }



  return (
    <>
      <Typography variant="h2">
        Booking
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">

        <Stack spacing={3} sx={{ width: 300 }}>
          <Autocomplete
            options={props.listofRooms.filter(r => r.name != null)}
            getOptionLabel={r => r.name}
            renderInput={(params) => <TextField {...params} label='Available rooms' style={inputStyles}
            />}
            onChange={(_, value) => { if (value) setBooking({ ...booking, roomId: value.id }) }}
          />

          <DatePicker label="Choose a booking date"
            onChange={(value) => { if (value) setDate(value as Dayjs) }} />

          <TimePicker
            label="Select start time"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            onChange={(value) => { if (value) setStartTime(value as Dayjs) }} />
          <TimePicker
            label="Select end time"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            onChange={(value) => { if (value) setEndTime(value as Dayjs) }}
          />

        </Stack>

      </LocalizationProvider>

      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
        sx={{
          variant: 'contained',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        }}
        onClick={handleAddBooking}
        >Confirm booking</Button>
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