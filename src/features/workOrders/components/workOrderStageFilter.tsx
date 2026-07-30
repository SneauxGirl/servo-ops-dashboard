import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { WorkOrder } from "../workOrders.types";
import { workOrderStageLabel } from "../WorkOrders.constants";

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
            <Select labelId="work-order-stage-label" id="work-order-stage" label="Stage" 
                value={value} onChange={(e) => onChange(e.target.value as StageFilter)}>
                <MenuItem value="all">All Stages</MenuItem>
                {stages.map((stage) => (
                    <MenuItem key={stage} value={stage} 
                    >{workOrderStageLabel[stage]}</MenuItem>
            ))}
            </Select>
        </FormControl>
    );
}