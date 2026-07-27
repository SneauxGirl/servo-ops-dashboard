import { Container, Stack, Typography} from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { WorkOrderList } from "../features/workOrders/components/WorkOrdersList";

export function WorkOrders() {
    const workOrders = useAppSelector(
        (state) => state.workOrders.items,
    );

    return (
        <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <div>
          <Typography component="h1" variant="h4">
            Work Orders
          </Typography>

          <Typography color="text.secondary">
            {workOrders.length} work orders
          </Typography>
        </div>

        <WorkOrderList workOrders={workOrders} />
      </Stack>
    </Container>
    );
    }