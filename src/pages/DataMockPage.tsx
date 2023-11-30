import { Container, TextField, Button, Card } from "@mui/material";
import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import { Stack } from "@mui/system";

function DataMockPage() {
    const alert = useAlert();
    const [containerName, setContainerName] = useState<string>('');
    const [idName, setIdName] = useState<string>('');
    const [data, setData] = useState<string>('');

    const addServiceMutation = useMutation({
        mutationFn: () => axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}admin/addDataMocker`, {
            containerName: containerName,
            idName: idName,
            data: data,
        }),
        onSuccess: () => {
            console.log('success');
        },
    })

    const handleSubmit = () => {
        addServiceMutation.mutate();
    }

    return (
        <BasePage alert={alert}>
            <Container>
                <Card sx={{padding: 2}}>
                    <Stack flexDirection={"column"} gap={2}>
                        <TextField label='containerName' onChange={v => setContainerName(v.target.value)}/>
                        <TextField label='idName' onChange={v => setIdName(v.target.value)} />
                        <TextField label='data' onChange={v => setData(v.target.value)} />
                        <Button onClick={handleSubmit} variant="outlined" color="success">submit</Button>
                    </Stack>
                </Card>
            </Container>
        </BasePage>
    )
}
export default DataMockPage;