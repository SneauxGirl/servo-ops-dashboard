import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { WorkOrder } from "../workOrders.types";

interface WorkOrderCardProps {
    workOrder: WorkOrder;
}

export function WorkOrderCard({
  workOrder,
}: WorkOrderCardProps) {
  return (
    <Card component="article" variant="outlined">
      <CardContent>
        <Stack spacing={2}>
            <div>
                <Typography component="h2" variant="h6">
                    {workOrder.partName}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    {workOrder.id}
                </Typography>
            </div>
            <Stack direction="row" spacing={1}>
                <Chip label={workOrder.stage} size="small" variant="outlined" sx={{ textTransform: "lowercase"}}></Chip>
                <Chip label={workOrder.priority} size="small" variant="outlined" sx={{ textTransform: "lowercase"}}></Chip>
            </Stack>
            <div>
                <Typography color="text.secondary" variant="caption">
                    Part Number 
                </Typography>
                <Typography variant="body1">
                    {workOrder.partNumber}
                </Typography>
            </div>
        </Stack>
      </CardContent>
    </Card>
  );
}