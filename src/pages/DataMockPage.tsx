import { Container, TextField, Button, Card, Typography } from "@mui/material";
import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import { Stack } from "@mui/system";
import AutocompleteDataMock from "../components/AutocompleteDataMock/AutocompleteDataMock";

function DataMockPage() {
    const alert = useAlert();
    
    // Add Data Mocker
    const [containerName, setContainerName] = useState<string>('');
    const [idName, setIdName] = useState<string>('');
    const [dataNum, setDataNum] = useState<string>('');

    const addServiceMutation = useMutation({
        mutationFn: () => axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}admin/addDataMocker`, {
            containerName: containerName,
            idName: idName,
            data: dataNum,
        }),
        onSuccess: () => {
            console.log('success');
        },
    })

    const handleAddSubmit = () => {
        if ((!/\s/.test(containerName)) && (idName.length === 4) && (dataNum === '1' || dataNum === '2')) {
          addServiceMutation.mutate();
        } else { 
            if (/\s/.test(containerName)) {
                alert.setSeverity('error');
                alert.setMessage('Container Name must not contain any whitespaces');
            } else if (idName.length !== 4) {
                alert.setSeverity('error');
                alert.setMessage('ID Name must be 4 characters');
            } else if (dataNum !== '1' && dataNum !== '2') {
                alert.setSeverity('error');
                alert.setMessage('Data must be 1 or 2');
            } else {
                alert.setSeverity('error');
                alert.setMessage('Something went wrong');
            }
          alert.setIsOpen(true);
        }
    }


    // Remove Data Mocker
    const [removeMetricLabelName, setRemoveMetricLabelName] = useState<string>('');

    const handleRemoveMetricLabelName = (name: string) => {
      setRemoveMetricLabelName(name);
    };
    
    const removeServiceMutation = useMutation({
      mutationFn: () => axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}admin/removeDataMocker`, {
        removeMetricLabelName: removeMetricLabelName,
      }),
      onSuccess: () => {
        console.log('success');
      },
    })

    const handleRemoveSubmit = () => {
        removeServiceMutation.mutate();
    }

    // Modify Data Mocker
    const [duration, setDuration] = useState<string>('');
    const [overrideValue, setOverrideValue] = useState<string>('');
    const [modifyMetricLabelName, setModifyMetricLabelName] = useState<string>('');

    const handleModifyMetricLabelName = (name: string) => {
      setModifyMetricLabelName(name);
    };

    const modifyServiceMutation = useMutation({
        mutationFn: () => axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}admin/modifyDataMocker`, {
            durationSeconds: duration,
            overrideValue: overrideValue,
            modifyMetricLabelName: modifyMetricLabelName,
        }),
        onSuccess: () => {
            console.log('success');
        },
    })

    const handleModifySubmit = () => {
        if ( parseInt(duration) > 0 && parseInt(overrideValue) > 0) {
            modifyServiceMutation.mutate();
        } else {
            if (parseInt(duration) <= 0) {
                alert.setSeverity('error');
                alert.setMessage('Duration must not be less than 1');
            } else if (parseInt(overrideValue) <= 0) {
                alert.setSeverity('error');
                alert.setMessage('Override Value must not be less than 1');
            } else if (duration && !Number.isInteger(parseInt(duration))) {
                alert.setSeverity('error');
                alert.setMessage('Duration must be an integer');
            } else if (overrideValue && !Number.isInteger(parseInt(overrideValue))) {
                alert.setSeverity('error');
                alert.setMessage('Override Value must be an integer');
            } else {
                alert.setSeverity('error');
                alert.setMessage('Something went wrong');
            }
            alert.setIsOpen(true);
        }
    }

    return (
        <BasePage alert={alert}>
            <Container>
                <Card sx={{padding: 2}}>
                    <Stack flexDirection={"column"} gap={2}>
                        <Typography variant="h6">Add Sensor</Typography>
                        <TextField label='Container Name' onChange={v => setContainerName(v.target.value)}/>
                        <TextField label='ID Name' onChange={v => setIdName(v.target.value)} />
                        <TextField label='Data Set' onChange={v => setDataNum(v.target.value)} />
                        <Button onClick={handleAddSubmit} variant="outlined" color="success">submit</Button>
                    </Stack>
                </Card>
            </Container>

            <Container>
                <Card sx={{padding: 2}}>
                    <Stack flexDirection={"column"} gap={2}>
                        <Typography variant="h6">Remove Sensor</Typography>
                        <AutocompleteDataMock onMetricLabelName={handleRemoveMetricLabelName} />
                        <Button onClick={handleRemoveSubmit} variant="outlined" color="success">submit</Button>
                    </Stack>
                </Card>
            </Container>

            <Container>
                <Card sx={{padding: 2}}>
                    <Stack flexDirection={"column"} gap={2}>
                        <Typography variant="h6">Modify Sensor</Typography>
                        <TextField label='Duration in Seconds' onChange={v => setDuration(v.target.value)}/>
                        <TextField label='Override Value' onChange={v => setOverrideValue(v.target.value)} />
                        <AutocompleteDataMock onMetricLabelName={handleModifyMetricLabelName} />
                        <Button onClick={handleModifySubmit} variant="outlined" color="success">submit</Button>
                    </Stack>
                </Card>
            </Container>
        </BasePage>
    )
}
export default DataMockPage;