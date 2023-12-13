import { Autocomplete, TextField, Chip, Grow, Paper, useTheme } from "@mui/material";
import { MetricType } from "../../metricLink";
import theme from "../../theme";
import { LabelToMetricType } from "../../utils/prometheusUtil";
import MetricAutoIcon from "../AutoIcon/MetricAutoIcon";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";


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

interface AutocompleteDataMockProps {
    onMetricLabelName: (name: string) => void;
  }

function AutocompleteDataMock(props: AutocompleteDataMockProps) {
    const [metricLabelName, setMetricLabelName] = useState<string>('');

    useEffect(() => {
        props.onMetricLabelName(metricLabelName);
    }, [metricLabelName, props.onMetricLabelName]);

    interface QueryData {
        status: string;
        data: string[];
    }


    const { data, isLoading } = useQuery<QueryData>(['allLabels'], {
        queryFn: async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_PROMETHEUS_API_ADDRESS}label/__name__/values`
        );
        return response.data;
        },
    });

    return (
        <Autocomplete
            sx={{ flexGrow: 1 }}
            PaperComponent={AutoCompleteDropdown}
            options={isLoading ? ['Loading...'] : (data && data.data ? data.data.filter(option => option.includes('co2_level') && !option.startsWith('a1e0')) : [])}
            renderInput={(params) => <TextField {...params} label='Metric Label Name' />}
            autoHighlight
            filterSelectedOptions
            value={(data && data.data && data.data.includes(metricLabelName)) ? metricLabelName : null}
            onChange={(_, value) => {
                setMetricLabelName(value ? String(value) : '');
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
    );
}

export default AutocompleteDataMock;