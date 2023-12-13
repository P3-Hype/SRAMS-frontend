import { Container, TextField, Button, Card, Typography, Autocomplete, Chip, Grow, Paper, useTheme } from "@mui/material";
import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { Stack } from "@mui/system";
import { MetricLink, MetricType } from "../metricLink";
import MetricAutoIcon from "../components/AutoIcon/MetricAutoIcon";
import theme from "../theme";
import { LabelToMetricType } from "../utils/prometheusUtil";

function AutoCompleteDropdown(props: { readonly children?: React.ReactNode }) {
	const theme = useTheme();
	return (
		<Grow in>
			<Paper
				sx={{
					border: '1px solid ' + theme.palette.primary.main,
					marginTop: 1,
					marginBottom: 1,
				}}
			>
				{props.children}
			</Paper>
		</Grow>
	);
}

function DataMockPage() {
    const alert = useAlert();
    
    // Add Data Mocker
    const [containerName, setContainerName] = useState<string>('');
    const [idName, setIdName] = useState<string>('');
    const [dataNum, setDataNum] = useState<string>('');

    // Remove Data Mocker
    const [partialContainerName, setPartialContainerName] = useState<string>('');

    // Modify Data Mocker
    const [duration, setDuration] = useState<string>('');
    const [overrideValue, setOverrideValue] = useState<string>('');
    const [port, setPort] = useState<string>('');

    // const [metricsToAdd, setMetricsToAdd] = useState<string[]>([]);


    const addServiceMutation = useMutation({
        mutationFn: () => axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}admin/addDataMocker`, {
            containerName: containerName,
            idName: idName,
            datas: dataNum,
        }),
        onSuccess: () => {
            console.log('success');
        },
    })

    const removeServiceMutation = useMutation({
        mutationFn: () => axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}admin/removeDataMocker`, {
            partialContainerName: partialContainerName,
        }),
        onSuccess: () => {
            console.log('success');
        },
    })

    const modifyServiceMutation = useMutation({
        mutationFn: () => axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}admin/modifyDataMocker`, {
            duration: duration,
            overrideValue: overrideValue,
            port: port,
        }),
        onSuccess: () => {
            console.log('success');
        },
    })

    const handleAddSubmit = () => {
        if ((dataNum === '1' || dataNum === '2') && idName.length === 4) {
            addServiceMutation.mutate();
        } else {
            if (dataNum !== '1' && dataNum !== '2') {
                alert.setSeverity('error');
                alert.setMessage('Data must be 1 or 2');
            } else if (idName.length !== 4) {
                alert.setSeverity('error');
                alert.setMessage('ID Name must be 4 characters');
            }
            alert.setIsOpen(true);
        }
    }

    const handleRemoveSubmit = () => {
        removeServiceMutation.mutate();
    }

    const handleModifySubmit = () => {
        modifyServiceMutation.mutate();
    }

    interface QueryData {
        status: string;
        data: string[];
      }
      
      const { data, isLoading } = useQuery<QueryData>(['allLabels'], {
        queryFn: async () => {
          const response = await axios.get(
            `http://130.225.39.44:9090/api/v1/label/__name__/values`
          );
          return response.data;
        },
      });

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
                        <Autocomplete
                            sx={{ flexGrow: 1 }}
                            PaperComponent={AutoCompleteDropdown}
                            options={isLoading ? ['Loading...'] : (data && data.data ? data.data.filter(option => option.includes('co2_level') && !option.startsWith('a1e0')) : [])}
                            renderInput={(params) => <TextField {...params} label='Add metric sources' />}
                            autoHighlight
                            filterSelectedOptions
                            value={(data && data.data && data.data.includes(partialContainerName)) ? partialContainerName : null}
                            onChange={(_, value) => {
                                setPartialContainerName(value ? String(value) : '');
                            }}
                            renderTags={(value: readonly unknown[], getTagProps) =>
                                value.map((option: unknown, index: number) => {
                                const optionString = String(option);
                                const metricType = MetricType[LabelToMetricType(optionString) as keyof typeof MetricType];
                                return (
                                    <Chip
                                    sx={{ paddingLeft: 1 }}
                                    icon={
                                        <MetricAutoIcon tooltip color={theme.palette.primary.light} metric={metricType} />
                                    }
                                    label={optionString}
                                    {...getTagProps({ index })}
                                    />
                                );
                                })
                            }
                            getOptionLabel={(option) => String(option)}
                        />
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
                        <TextField label='Port' onChange={v => setPort(v.target.value)} />
                        <Button onClick={handleModifySubmit} variant="outlined" color="success">submit</Button>
                    </Stack>
                </Card>
            </Container>
        </BasePage>
    )
}
export default DataMockPage;