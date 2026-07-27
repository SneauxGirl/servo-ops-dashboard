import { Box } from "@mui/material";
import type { WorkOrder } from "../workOrders.types";
import { WorkOrderCard } from "./WorkOrderCard";

interface WorkOrderListProps {
  workOrders: WorkOrder[];
}

export function WorkOrderList({
  workOrders,
}: WorkOrderListProps) {
  return (
    <Box
      component="section"
      aria-label="Work orders"
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
        },
      }}
    >
      {workOrders.map((workOrder) => (
        <WorkOrderCard
          key={workOrder.id}
          workOrder={workOrder}
        />
      ))}
    </Box>
  );
}