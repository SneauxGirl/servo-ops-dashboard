import { FormControl, InputLabel, MenuItem, Select, } from "@mui/material";

export type WorkOrderSortOption =
| "partName"
| "priority"
| "stage";

interface WorkOrderSortProps {
    value: WorkOrderSortOption;
    onChange: (value: WorkOrderSortOption) => void;
}

export function WorkOrderSort({
    value, onChange,
}: WorkOrderSortProps) {
    return (
        <FormControl fullWidth>
            <InputLabel id="work-order-sort-label">Sort By</InputLabel>
            <Select labelId="work-order-sort-label" id="work-order-sort" label="Sort By"
                value={value} onChange={(e) => onChange(e.target.value as WorkOrderSortOption,
                )}
            >
                <MenuItem value="partName">Part Name</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="stage">Stage</MenuItem>
            </Select>
        </FormControl>
    );
}
