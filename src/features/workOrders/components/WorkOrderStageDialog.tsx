import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, } from "@mui/material";

import type { WorkOrderStage } from "../workOrders.types";

interface WorkOrderStageDialogProps {
    currentStage: WorkOrderStage;
    open: boolean;
    onClose: () => void;
    onSave: (stage: WorkOrderStage) => void;
}

const stages: WorkOrderStage[] = [
    "cam",
    "ready",
    "machining",
    "inspection",
    "complete",
    "blocked",
];

export function WorkOrderStageDialog({
    currentStage, open, onClose, onSave,
}: WorkOrderStageDialogProps) {
    const [selectedStage, setSelectedStage] = 
    useState<WorkOrderStage>(currentStage);

    useEffect(() => {
        if(open) {
            setSelectedStage(currentStage);
        }
    }, [currentStage, open]);

    function handleSave() {
        onSave(selectedStage);
    }

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
            <DialogTitle>Change Work Order Stage</DialogTitle>

            <DialogContent>
                <FormControl fullWidth sx={{ mt:1 }}>
                    <InputLabel id="work-order-stage-label">Stage</InputLabel>
                    <Select labelId="work-order-stage-label" label="Stage" value={selectedStage} sx={{ textTransform: "capitalize"}}
                        onChange={(e) => {setSelectedStage(e.target.value as WorkOrderStage,);
                        }}
                    >
                        {stages.map((stage) => (
                            <MenuItem key={stage} value={stage} sx={{ textTransform: "capitalize"}}>
                                {stage}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSave} disabled={selectedStage === currentStage}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}