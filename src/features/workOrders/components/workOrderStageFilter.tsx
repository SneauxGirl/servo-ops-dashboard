import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { WorkOrder } from "../workOrders.types";

export type StageFilter = "all" | WorkOrder["stage"];

interface WorkOrderStageFilterProps {
    value: StageFilter;
    stages: WorkOrder["stage"][];
    onChange: (value: StageFilter) => void;
}

export function WorkOrderStageFilter(
    { value, stages, onChange,
}: WorkOrderStageFilterProps) {

    return (
        <FormControl fullWidth>
            <InputLabel id="work-order-stage-label">Stage</InputLabel>
            <Select labelId="work-order-stage-lable" id="work-order-stage" label="stage" 
                value={value} onChange={(e) => onChange(e.target.value as StageFilter)}>
                <MenuItem value="all">All Stages</MenuItem>
                {stages.map((stage) => (
                    <MenuItem key={stage} value={stage} 
                    sx={{ textTransform: "capitalize"}} >{stage}</MenuItem>
                    //caps added for styling because I like the lower case on chips and don't want to depend on array formatting)
            ))}
            </Select>
        </FormControl>
    );
}