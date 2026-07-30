import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { WorkOrder } from "../workOrders.types";
import { workOrderPriorityLabel, workOrderStageLabel} from "../WorkOrders.constants";
import { Link } from "react-router";

interface WorkOrderCardProps {
    workOrder: WorkOrder;
}

export function WorkOrderCard({
  workOrder,
}: WorkOrderCardProps) {
  return (
    <Card component="article" variant="outlined">
        <CardActionArea component={Link} to={`/work-orders/${workOrder.id}`} sx= {{height: "100%"}}>
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
                    <Stack direction="row" spacing={1} useFlexGap sx={{flexWrap: "wrap" }}>
                        <Chip label={workOrderStageLabel[workOrder.stage]} size="small" variant="outlined" sx={{ textTransform: "lowercase"}} />
                        <Chip label={workOrderPriorityLabel[workOrder.priority]} size="small" variant="outlined" sx={{ textTransform: "lowercase"}} />
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
        </CardActionArea>
    </Card>
  );
}